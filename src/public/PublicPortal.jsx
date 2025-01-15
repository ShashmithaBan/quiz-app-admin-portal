import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestions, fetchPassMark } from '../store/slice/questionSlice';
import Question from './Question';
import Answer from './Answer';
import Modal from './Modal';
import Timer from '../components/Reusable/Timer';

function PublicPortal() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const passMark = useSelector((state) => state.questions.passMark);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswerScore, setCorrectAnswerScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(5000);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const initializeQuiz = async () => {
    try {
      await dispatch(fetchPassMark());
      const result = await dispatch(fetchAllQuestions()).unwrap();
      const shuffled = shuffleArray(result);
      setShuffledQuestions(shuffled);
      setShuffledAnswers(
        shuffled[0]?.options ? shuffleArray(shuffled[0].options) : []
      );
      setCurrentQuestionIndex(0);
      setCorrectAnswerScore(0);
      setSelectedAnswer(null);
      setIsFinished(false);
    } catch (error) {
      console.error('Error fetching questions or pass mark:', error);
    }
  };

  useEffect(() => {
    initializeQuiz();
  }, [dispatch]);

  const handleSelectAnswer = (selectedOption, isCorrect) => {
    setSelectedAnswer(selectedOption);
    if (isCorrect) {
      setCorrectAnswerScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setShuffledAnswers(
        shuffleArray(shuffledQuestions[nextIndex]?.options || [])
      );
      // setTimerExpired(5000)
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleCloseModal = () => {
    setIsFinished(false);
  };

  const handleStartAgain = () => {
    initializeQuiz();
  };

  if (shuffledQuestions.length === 0) {
    return <p className='text-2xl text-blue-500 mx-auto block'>Loading questions...</p>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <>
      <Header />
      <Modal open={isFinished} onClose={handleCloseModal}>
        <h2 className='text-2xl font-bold text-green-500'>Quiz Completed!</h2>
        <p className='text-xl text-center'>
          Your Score: {correctAnswerScore} / {shuffledQuestions.length}
        </p>
        <p
          className={`text-xl text-center ${correctAnswerScore >= passMark ? 'text-green-500' : 'text-red-500'
            }`}
        >
          You {correctAnswerScore >= passMark ? 'Pass' : 'Fail'}!
        </p>
        <button onClick={handleStartAgain} className='mt-4 mx-auto block border-2 border-green-500 px-5 py-2 font-semibold rounded-lg text-accent  bg-green-100 hover:bg-accent hover:text-white'>Start Again</button>
      </Modal>
      <div className="question-container flex flex-col justify-center items-center mt-20">
        <Question question={currentQuestion.question} currentQuestionIndex={currentQuestionIndex}  handleNextQuestion = {handleNextQuestion}/>

        <Answer
          options={shuffledAnswers}
          correctAnswer={currentQuestion.answer}
          onSelectAnswer={(selectedOption, isCorrect) =>
            handleSelectAnswer(selectedOption, isCorrect)
          }
        />
        {/* <Timer timeout={} onTimeOut={handleNextQuestion} /> */}
        <p className='text-xl'>Selected Answer: <span className='text-green-500 font-bold'>{selectedAnswer || 'None'}</span></p>
        <button className='mx-auto block border-2 mt-5 border-green-500 px-10 py-2 font-semibold rounded-lg text-accent  bg-green-100 hover:bg-accent hover:text-white' onClick={handleNextQuestion}>
          {currentQuestionIndex === shuffledQuestions.length - 1
            ? 'Finish Quiz'
            : 'Next'}
        </button>
      </div>
    </>
  );
}

export default PublicPortal;