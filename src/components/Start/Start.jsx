import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './christina-wocintechchat-com-eF7HN40WbAQ-unsplash.jpg'
import './Start.css'

const Start = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => {
        navigate('/quiz');
      }).catch((err) => {
        alert('Please enable fullscreen mode to start the quiz.');
      });
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen().then(() => {
        navigate('/quiz');
      }).catch((err) => {
        alert('Please enable fullscreen mode to start the quiz.');
      });
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen().then(() => {
        navigate('/quiz');
      }).catch((err) => {
        alert('Please enable fullscreen mode to start the quiz.');
      });
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen().then(() => {
        navigate('/quiz');
      }).catch((err) => {
        alert('Please enable fullscreen mode to start the quiz.');
      });
    } else {
      alert('Fullscreen mode is not supported by your browser.');
    }
  };

  return (
    <div className='container'>
      <div className='left-container'>
        <div>
          <h1><span>Welcome</span> to</h1>
          <h1>the <span>Quiz</span></h1>
          <h1><span>Provided</span> By</h1>
          <h1>Smart<span>Hire</span></h1>
        </div>
        <div>
          <p>There will be 10 Questions of General Knowledge which needs to be <br/> completed in 10 minutes.</p>
        </div>
        <div>
          <button className='button-container' onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      </div>
      <div>
        <img className='logo' src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Start;