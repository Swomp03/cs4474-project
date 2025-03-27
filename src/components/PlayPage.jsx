import './componentStyles/PlayPage.css';

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadData } from '../utils/localStorage';

const PlayPage = () => {
  const { folderId, deckId } = useParams();
  const navigate = useNavigate();
  const data = loadData();
  const folder = data.find(f => f.id === folderId);
  const foundDeck = folder?.decks.find(d => d.id === deckId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    if (currentIndex < foundDeck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    const card = document.getElementById("card");
    if (!card) return;

    card.classList.toggle("reveal");

    setShowAnswer(!showAnswer);
  };

  return (
    <div className="page-container">
      <button id="return-button" className="large-btn default-btn" onClick={() => navigate(-1)}>Return</button>

      <div id="play-page-content">
        <div id="card">
          <div id="card-inner">
            <div id="card-front">
              <span className="card-text">{foundDeck.cards[currentIndex].question}</span>
            </div>
            <div id="card-back">
              <span className="card-text">{foundDeck.cards[currentIndex].answer}</span>
            </div>
          </div>
        </div>

        <button id="toggle-answer-button" className="default-btn" onClick={toggleAnswer}>
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>

        <div id="navigation">
          <button className="default-btn" onClick={handlePrev} disabled={currentIndex === 0}>Prev</button>
          <span>{currentIndex + 1}/{foundDeck.cards.length}</span>
          <button className="default-btn" onClick={handleNext} disabled={currentIndex === foundDeck.cards.length - 1}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;