import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from '../Question/Question';
import Result from '../Result/Result';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then(data => setQuestions(data.slice(0, 10)));

    const savedQuestionIndex = localStorage.getItem('currentQuestionIndex');
    const savedScore = localStorage.getItem('score');
    const savedTimer = localStorage.getItem('timer');

    if (savedQuestionIndex !== null) {
      setCurrentQuestionIndex(Number(savedQuestionIndex));
    }

    if (savedScore !== null) {
      setScore(Number(savedScore));
    }

    if (savedTimer !== null) {
      setTimer(Number(savedTimer));
    }

    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          localStorage.setItem('timer', prevTimer - 1);
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          handleTimeOut();
          return prevTimer;
        }
      });
    }, 1000);

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("You are being redirected to the home page. You can resume the test where you left off.");
        navigate('/');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };

  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem('score', newScore);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      const newQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newQuestionIndex);
      localStorage.setItem('currentQuestionIndex', newQuestionIndex);
    } else {
      setShowResult(true);
      localStorage.removeItem('currentQuestionIndex');
      localStorage.removeItem('score');
    }
  };

  const handleTimeOut = () => {
    setShowResult(true);
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('score');
    localStorage.removeItem('timer');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(600);
    setShowResult(false);
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('score');
    localStorage.removeItem('timer');
    navigate('/');
  };

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        handleRestart();
      }, 5000); // Redirect after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showResult]);

  if (showResult) {
    return (
      <div className='result'>
        <Result score={score} totalQuestions={questions.length} />
      </div>
    );
  }

  return (
    <div>
      <div className="timer-card">
        <h3>Time Remaining, <span>{formatTime(timer)}</span></h3>
      </div>
      {questions.length > 0 ? (
        <Question 
          data={questions[currentQuestionIndex]} 
          onAnswer={handleAnswer} 
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Quiz;