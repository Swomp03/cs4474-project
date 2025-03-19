import "./componentStyles/EditDeckModal.css";

import {useParams} from "react-router-dom";
import {loadData} from "../utils/localStorage.js";
import {EditDeckCard, AddDeckCard} from "./EditDeckCard.jsx";
import {useState} from "react";

// TODO: Make escape hide modal as well?

const EditDeckModal = (props) => {

    const defaultCards = [{"index": 0, "question": "HI?", "answer": "HELLO"}, {"index": 1, "question": "test?", "answer": "123"},
        {"index": 2, "question": "Anyone home?", "answer": "Yes"}, {"index": 3, "question": "9 + 10?", "answer": "21"}];

    const [cards, setCards] = useState(defaultCards);

    // setCards(defaultCards);

    // TODO: Fix being unable to click padding around modal-container to close modal

    const addCard = () => {
        const newIndex = cards.length + 1;
        const newCard = {"index": newIndex, "question": "New question", "answer": "New answer"};
        setCards([...cards, newCard]);
        console.log(cards);
    }

    const moveCard = (currIndex, newIndex) => {
        console.log("moving from", currIndex, "to", newIndex);

        const adjustedCards = [...cards];

        let targetCard = adjustedCards[newIndex];
        targetCard.index = currIndex;

        adjustedCards[newIndex] = adjustedCards[currIndex];
        adjustedCards[currIndex] = targetCard;

        setCards(adjustedCards);
    }

    // TODO: Make card key unique and not the index

    return (
        <div className="static">
            <div id="modal-background" onClick={() => props.toggleVisibility()}></div>

            <div id="modal-container">
                <div id="modal-body">
                    <div id="modal-header">
                        <button className={"header-btn"} onClick={() => props.toggleVisibility()}>Cancel</button>
                        <h1>Edit Deck</h1>
                        <button className={"header-btn save-btn"}>Save</button>
                    </div>

                    <div id="cards-container">
                        {cards.map((card, index) => (
                            <EditDeckCard key={index} index={card.index} question={card.question} answer={card.answer} moveCard={moveCard}></EditDeckCard>
                        ))}
                        <AddDeckCard addCard={addCard}></AddDeckCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDeckModal;