import React from 'react';
import './ScoreDisplay.css';

const ScoreDisplay = ({ score, strikes }) => {
  return (
    <div className="score-strikes-container">
      <div className="score-container">
        Puntaje: <span className="score">{score}</span>
      </div>
      <div className="strikes-container">
        Strikes: <span className="strikes">{strikes}</span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
