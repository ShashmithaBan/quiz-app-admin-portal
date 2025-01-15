import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';  
import { getDatabase, ref, set, push, get, remove } from 'firebase/database';



export const savePassMarksToDatabase = createAsyncThunk(
  'questions/savePassMarks',
  async (passMark, { rejectWithValue }) => {
    try {
      const dbInstance = getDatabase();
      const passMarkRef = ref(dbInstance, 'passMarks'); 
      await set(passMarkRef, passMark); 

      return passMark; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);

export const fetchPassMark = createAsyncThunk(
  'questions/fetchPassMark',
  async () => {
    const dbInstance = getDatabase();
    const passMarkRef = ref(dbInstance, 'passMarks');
    const snapshot = await get(passMarkRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val();
  }
);

export const saveQuestionToDatabase = createAsyncThunk(
  'questions/addQuestion',
  async (questionData, { rejectWithValue }) => {
    try {
      const dbInstance = getDatabase(); 
      const newQuestionRef = push(ref(dbInstance, 'questions'));  
      await set(newQuestionRef, questionData);  

     
      return { id: newQuestionRef.key, ...questionData };
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchAllQuestions = createAsyncThunk(
    'questions/fetchAll',
    async () => {
        const dbInstance = getDatabase();
        const questionsRef = ref(dbInstance, 'questions');
        const snapshot = await get(questionsRef);
       
        if (!snapshot.exists()) {
            return [];
        }
        const questions = Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        return questions;
    }   
)


export const deleteQuestionById = createAsyncThunk(
  'questions/delete',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id); 
      const dbInstance = getDatabase();
      const delQuestionRef = ref(dbInstance, `questions/${id}`);
      await remove(delQuestionRef);
      console.log('Question delete', id); 
      return id;
    } catch (error) {
      console.error('Error deleting question:', error.message); 
      return rejectWithValue(error.message);
    }
  }
);

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    questionCount: 0,
    passMark: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveQuestionToDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveQuestionToDatabase.fulfilled, (state, action) => {
        state.loading = false;
      
        state.questions.push(action.payload);
      })
      .addCase(saveQuestionToDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllQuestions.pending, (state) =>{

        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) =>{

        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) =>{

        state.loading = false;
        state.error = action.payload;
      } )
      .addCase(deleteQuestionById.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
      .addCase(deleteQuestionById.fulfilled, (state, action) => {
    state.loading = false;
    state.questions = state.questions.filter(
      (question) => question.id !== action.payload
    );
  })
    .addCase(deleteQuestionById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  .addCase(savePassMarksToDatabase.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(savePassMarksToDatabase.fulfilled, (state, action) => {
    state.loading = false;
    state.passMark = action.payload;
  })
  .addCase(savePassMarksToDatabase.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  .addCase(fetchPassMark.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchPassMark.fulfilled, (state, action) => {
    state.loading = false;
    state.passMark = action.payload;
  })
  .addCase(fetchPassMark.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  },
});

export default questionSlice.reducer;