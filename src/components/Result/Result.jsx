import React from 'react';
import './Result.css'

const Result = ({ score, totalQuestions }) => {
  return (
    <div>
      <h2>Quiz Completed</h2>
      <p>
        Your score is {score} out of {totalQuestions}.
        You'll be redirected to main page in few seconds.
      </p>
    </div>
  );
};

export default Result;