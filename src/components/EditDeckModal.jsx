import "./componentStyles/EditDeckModal.css";

import {useParams} from "react-router-dom";
import {loadData} from "../utils/localStorage.js";
import {EditDeckCard, AddDeckCard} from "./EditDeckCard.jsx";
import {useState} from "react";

// TODO: Make escape hide modal as well?

const EditDeckModal = (props) => {

    const defaultCards = [
        {"index": 0, "question": "HI?", "answer": "HELLO"},
        {"index": 1, "question": "test?", "answer": "123"},
        {"index": 2, "question": "Anyone home?", "answer": "Yes"},
        {"index": 3, "question": "9 + 10?", "answer": "21"}
    ];

    const [cards, setCards] = useState(defaultCards);

    // TODO: Fix being unable to click padding around modal-container to close modal

    // TODO: Prevent changing index at bounds

    const addCard = () => {
        // Create a new card at the end of the deck, with placeholder text
        const newCard = {"index": cards.length, "question": "New question", "answer": "New answer"};
        setCards([...cards, newCard]);
        console.log(cards);
    }

    const increaseIndex = (currIndex) => {
        const newCards = [...cards]; // Make a copy of the array

        const targetCard = newCards[currIndex + 1];
        newCards[currIndex + 1] = newCards[currIndex]; // Increase the moving card's index by 1
        newCards[currIndex + 1].index = currIndex + 1;

        targetCard.index = currIndex; // Change the target card's index to the index of the moved card
        newCards[currIndex] = targetCard;

        setCards(newCards);
    }

    const decreaseIndex = (currIndex) => {
        const newCards = [...cards]; // Make a copy of the array

        const targetCard = newCards[currIndex - 1];

        newCards[currIndex - 1] = newCards[currIndex]; // Decrease the moving card's index by 1
        newCards[currIndex - 1].index = currIndex - 1;

        targetCard.index = currIndex; // Change the target card's index to the index of the moved card
        newCards[currIndex] = targetCard;

        setCards(newCards);
    }

    const moveCard = (currIndex, newIndexString) => {
        if (newIndexString === "") {

            return;
        }

        const newIndex = parseInt(newIndexString) - 1; // -1 because the index is +1 as a input value

        console.log("moving from index", currIndex + 1, "to", newIndex + 1);

        if (isNaN(newIndex)) {
            console.log("Invalid index");
        } else if (newIndex < 0 || newIndex > cards.length - 1) {
            console.log(`Index out of range (1 - ${cards.length})`);
        } else {
            const adjustedCards = [...cards];

            const targetCard = adjustedCards[newIndex];

            adjustedCards[newIndex] = adjustedCards[currIndex];
            adjustedCards[newIndex].index = newIndex;

            targetCard.index = currIndex;
            adjustedCards[currIndex] = targetCard;

            setCards(adjustedCards);
        }
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
                            <EditDeckCard key={index} index={card.index} question={card.question}
                                          answer={card.answer} increaseIndex={increaseIndex}
                                          decreaseIndex={decreaseIndex} moveCard={moveCard}></EditDeckCard>
                        ))}
                        <AddDeckCard addCard={addCard}></AddDeckCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDeckModal;