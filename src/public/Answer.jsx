import React, { useState } from 'react';

function Answer({ options, correctAnswer, onSelectAnswer }) {

  const handleAnswerClick = (option , index) => {
    // setSelectedIndex(index);
    const isCorrect = option === correctAnswer; 
    onSelectAnswer(option, isCorrect); 
  };

  return (
    <div className="answer-container flex flex-col my-7 text-xl gap-[1rem]  ">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(option , index)}
          className={`answer-button w-[30rem] border border-gray-500 py-2 rounded-md hover:bg-green-100 hover:border-green-500 hover:text-green-500
           
            `}
            // ${selectedIndex===index ?  'text-green-500 border-green-500 bg-green-100' : ''}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Answer; 