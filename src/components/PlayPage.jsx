import './componentStyles/PlayPage.css';

import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {loadData} from '../utils/localStorage';

import returnArrow from "../assets/icons/arrow_back.svg";
import arrowBack from "../assets/icons/arrow_back_with_tail.svg";
import arrowForward from "../assets/icons/arrow_forward_with_tail.svg";
// import visibility from "../assets/icons/visibility.svg";
// import visibilityOff from "../assets/icons/visibility_off.svg";

const PlayPage = () => {
    const {folderId, deckId} = useParams();
    const navigate = useNavigate();

    const data = loadData();
    const folder = data.find(f => f.id === folderId);
    const foundDeck = folder?.decks.find(d => d.id === deckId);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleNext = () => {
        if (currentIndex < foundDeck.cards.length - 1) {
            moveCard(1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            moveCard(-1);
        }
    };

    const moveCard = (direction) => {
        const card = document.getElementById("card");
        const playPage = document.getElementById("play-page");

        const revealCardTime = 460;
        const changeAnswerTime = 250;
        const moveCardTime = 750; // Must match animation-duration in css

        let currentTimeout = 0;

        if (playPage) playPage.classList.add('hide-overflow');

        if (card && card.classList.contains("reveal")) {
            card.classList.remove("reveal");

            currentTimeout += revealCardTime;

            setTimeout(() => {
                if (card) card.classList.add(direction === 1 ? "next-card" : "prev-card");
            }, currentTimeout);
        } else {
            if (card) card.classList.add(direction === 1 ? "next-card" : "prev-card");
        }

        currentTimeout += changeAnswerTime;

        setTimeout(() => {
            setCurrentIndex(currentIndex + direction);
            setShowAnswer(false);
        }, currentTimeout);

        currentTimeout += moveCardTime;

        setTimeout(() => {
            if (card) card.classList.remove(direction === 1 ? "next-card" : "prev-card");
            if (playPage) playPage.classList.remove('hide-overflow');
        }, currentTimeout);
    }

    const toggleAnswer = () => {
        const card = document.getElementById("card");
        if (!card) return;

        card.classList.toggle("reveal");

        setShowAnswer(!showAnswer);
    };

    return (
        <div id="play-page" className="page-container">
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
                    <button className="default-btn img-btn" onClick={handleNext}
                            disabled={currentIndex === foundDeck.cards.length - 1}>
                        Next
                        <img src={arrowForward} alt="Forward arrow"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlayPage;