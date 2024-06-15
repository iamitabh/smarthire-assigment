import React, { useState } from 'react';
import './Question.css';

const Question = ({ data, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption === data.answer;
      onAnswer(isCorrect);
    } else {
      // Optionally, you can add an alert or message to select an option
      console.log('Please select an option.');
    }
  };

  return (
    <div className='question-container'>
      <div className='inner-container'>
        <h1 className='question'>{data.question}</h1>
        <div>
          {data.options.map((option, index) => (
            <div key={index} className='options'>
              <input
                
                type="radio"
                id={`option${index}`}
                name="options"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <button className='question-button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Question;