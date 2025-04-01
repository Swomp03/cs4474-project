import './componentStyles/PlayPage.css';

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadData } from '../utils/localStorage';

import returnArrow from "../assets/icons/arrow_back.svg";
import arrowBack from "../assets/icons/arrow_back_with_tail.svg";
import arrowForward from "../assets/icons/arrow_forward_with_tail.svg";
import visibility from "../assets/icons/visibility.svg";
import visibilityOff from "../assets/icons/visibility_off.svg";

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
      const card = document.getElementById("card");
      if (card) card.classList.remove("reveal");
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const card = document.getElementById("card");
      if (card) card.classList.remove("reveal");
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
      <button id="return-button" className="large-btn default-btn img-btn" title="Return to the previous page"
              onClick={() => navigate(-1)}>
        <img src={returnArrow} alt="Back arrow"/>
        Return
      </button>

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

        <button id="toggle-answer-button" className="default-btn img-btn" onClick={toggleAnswer}>
          {/*<img src={showAnswer ? visibilityOff : visibility} alt="Visibility icon"/>*/}
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>

        <div id="navigation">
          <button className="default-btn img-btn" onClick={handlePrev} disabled={currentIndex === 0}>
            <img src={arrowBack} alt="Back arrow"/>
            Prev
          </button>
          <span>{currentIndex + 1}/{foundDeck.cards.length}</span>
          <button className="default-btn img-btn" onClick={handleNext} disabled={currentIndex === foundDeck.cards.length - 1}>
            Next
            <img src={arrowForward} alt="Forward arrow"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;