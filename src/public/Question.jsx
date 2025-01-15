import React from 'react'
import Timer from '../components/Reusable/Timer'

function Question({question , currentQuestionIndex , handleNextQuestion}) {
  return (
    <div className='text-3xl'><span className="font-bold">{currentQuestionIndex+1}.</span> {question}
    <br/>
    {/*   */}
    </div>
    
  )
}

export default Question