import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuestionToDatabase } from '../store/slice/questionSlice';
import Input from '../components/Reusable/Input';
import { set } from 'firebase/database';
import Modal from '../public/Modal';

function AddQuestion() {
  const [questionData, setQuestionData] = useState({
    question: '',
    answer: '',
    options: [''],
  });
  const [showOptions, setShowOptions] = useState(false);
  const [errors, setErrors] = useState({ question: '', options: '', answer: '' });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.questions);

  const handleQuestionChange = (e) => {
    setQuestionData({ ...questionData, question: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = value;
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  const handleAddOption = () => {
    setQuestionData({ ...questionData, options: [...questionData.options, ''] });
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = questionData.options.filter((_, i) => i !== index);
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  const handleAnswerChange = (e) => {
    setQuestionData({ ...questionData, answer: e.target.value });
    setErrors((prev) => ({ ...prev, answer: '' }));
  };
  const validateFields = () => {
    let isValid = true;
    const newErrors = { question: '', options: '', answer: '' };

    if (!questionData.question.trim()) {
      newErrors.question = 'Question cannot be empty';
      isValid = false;
    }

    if (questionData.options.some((option) => !option.trim())) {
      newErrors.options = 'All options must be filled';
      isValid = false;
    }

    if (!questionData.answer) {
      newErrors.answer = 'You must select the correct answer';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = () => {
    if (!validateFields()) return;
    dispatch(saveQuestionToDatabase(questionData))
      .unwrap()
      .then(() => {
        setShowOptions(true);
        setQuestionData({ question: '', answer: '', options: [''] });
      })
      .catch((err) => alert(`Error adding question: ${err}`));
  };
  const handleCloseModal = () => {
    setShowOptions(false);
  };

  return (
    
    
    <div className="add-question flex-col flex justify-content items-center my-9">
      <Modal open={showOptions} onClose={handleCloseModal}>
        <p className='text-2xl'>Question added successfully</p>
      </Modal>
      <h2 className='text-3xl text-center'>Add Question</h2>
      <div className='my-[5rem]'>
     
      <div className='flex gap-[3rem]'>
        <div >
        <h4 className='mb-2'>Question:</h4>
      <Input
        type="text"
        placeholder="Question"
        value={questionData.question}
        onChange={handleQuestionChange}
        className='w-[30rem] h-[3rem]'
        required='true'
      />
        </div>
     
      <div>
        <h4 className='mb-2'>Options:</h4>
        {questionData.options.map((option, index) => (
          <div key={index} className='my-2 flex gap-[2rem]' >
            <Input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required='true'
              className=' h-[3rem]'
            />
            <button
              type="button"
              onClick={() => handleRemoveOption(index)}
              className='bg-red-500 text-white font-semibold  px-5 rounded-lg hover:bg-red-600'
            >
              Remove
            </button>
          </div>
        ))}
      
      </div>
      </div>
      
      <button className="ml-auto block bg-green-600 text-white font-semibold py-2  px-5 rounded-lg hover:bg-green-700" type="button" onClick={handleAddOption}>
  Add Option
</button>
      <div className='flex justify-center my-8 px-2 py-2 border border-green-500 gap-[2rem]'>
        <h4 className='text-accent font-bold'>Correct Answer:</h4>
        <select className='bg-green-100 text-center text-accent font-semibold rounded-lg px-4' value={questionData.answer} onChange={handleAnswerChange}>
          <option value="" disabled>
            Select Correct Answer
          </option>
          {questionData.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {errors.question && (
          <p className="text-red-500 text-sm text-center my-2">{errors.question}</p>
        )}
      {errors.options && (
          <p className="text-red-500 text-sm text-center my-2">{errors.options}</p>
        )}
      {errors.answer && (
          <p className="text-red-500 text-sm text-center my-2">{errors.answer}</p>
        )}
      <button className='mx-auto block border-2 border-green-500 px-5 py-2 font-semibold rounded-lg text-accent  bg-green-100 hover:bg-accent hover:text-white' onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Add Question'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
      
    </div>
    
  );
}

export default AddQuestion;