import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPassMark, savePassMarksToDatabase } from '../store/slice/questionSlice';
import Input from '../components/Reusable/Input';


function PassMarkForm() {
  const [passMark, setPassMark] = useState('');
  const dispatch = useDispatch();
  const currentPassMark = useSelector((state) => state.questions.passMark);
  const loading = useSelector((state) => state.questions.loading);
  const questionCount = useSelector((state) => state.questions.questions.length);
  console.log(questionCount);

  const handleSavePassMark = () => {
    const passMarkValue = Number(passMark);

    if (!passMarkValue || isNaN(passMarkValue)) {
      alert('Please enter a valid number for the pass mark.');
      return;
    }

    if (passMarkValue > questionCount) {
      alert('Pass Mark should be less than or equal to the Question Count.');
      return;
    }

    dispatch(savePassMarksToDatabase(passMarkValue))
      .then(() => {
        console.log('Pass mark saved successfully');
        setPassMark(''); 
      })
      .catch((error) => {
        console.error('Error saving pass mark:', error);
      });
  };

  useEffect(() => {
    const fetchCurrentPassMark = async () => {
      try {
        const result = await dispatch(fetchPassMark())
        console.log('Current Pass Mark:', result);
      } catch (error) {
        console.error('Error fetching pass mark:', error);
      }
    };

    fetchCurrentPassMark();
  }, [dispatch]);

  return (
    <div className="add-question flex-col flex justify-content items-center my-9">
      <h2 className='text-3xl text-center'>Pass Mark Setting</h2>
      <h3 className='text-xl text-blue-500 mt-5'>Current Pass Mark: {loading ? 'Loading...' : currentPassMark || 'Not Set'}</h3>
      <Input
        type="number"
        value={passMark}
        onChange={(e) => setPassMark(e.target.value)}
        placeholder="Enter pass mark"
        className='w-[30rem] h-[3rem] my-5'
      />
      <button className='bg-green-600 text-white font-semibold py-2  px-5 rounded-lg hover:bg-green-700' onClick={handleSavePassMark}>Save</button>
    </div>
  );
}

export default PassMarkForm;