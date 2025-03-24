import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadData } from '../utils/localStorage';
import './componentStyles/PlayPage.css';

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
    const card = document.getElementById("card-display");
    if (!card) return;

    card.classList.add("reveal");

    setTimeout(function(){
      setShowAnswer(!showAnswer);
    }, 250);

    setTimeout(function(){
      card.classList.remove("reveal");
    }, 510);
  };

  return (
    <div className="play-page">
      <button className="return-button" onClick={() => navigate(-1)}>Return</button>
      <div id="card-display">
        <div className="card-content">
          {showAnswer ? foundDeck.cards[currentIndex].answer : foundDeck.cards[currentIndex].question}
        </div>
      </div>
      <button className="toggle-answer-button" onClick={toggleAnswer}>
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
      <div className="navigation">
        <button onClick={handlePrev} disabled={currentIndex === 0}>Prev</button>
        <span>{currentIndex + 1}/{foundDeck.cards.length}</span>
        <button onClick={handleNext} disabled={currentIndex === foundDeck.cards.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default PlayPage;