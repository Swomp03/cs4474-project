import "./componentStyles/EditDeckModal.css";

import {useParams} from "react-router-dom";
import {loadData} from "../utils/localStorage.js";
import {EditDeckCard, AddDeckCard} from "./EditDeckCard.jsx";
import {useEffect, useState} from "react";

// TODO: Make escape hide modal as well?

const EditDeckModal = (props) => {

    const defaultCards = [
        {"index": 0, "question": "HI?", "answer": "HELLO"},
        {"index": 1, "question": "test?", "answer": "123"},
        {"index": 2, "question": "Anyone home?", "answer": "Yes"},
        {"index": 3, "question": "9 + 10?", "answer": "21"}
    ];

    const [cards, setCards] = useState(defaultCards);

    useEffect(() => {
        const container = document.getElementById("cards-container");
        if (!container) return;

        const cards = container.children;
        if (cards.length === 1) return;

        // Reset all elements
        [...cards].forEach(card => {
            const lastChild = card.lastChild;
            if (lastChild.firstChild.classList?.contains("disabled")) {
                lastChild.firstChild.classList.remove("disabled");
                lastChild.firstChild.disabled = false;
            }

            if (lastChild.lastChild.classList?.contains("disabled")) {
                lastChild.lastChild.classList.remove("disabled");
                lastChild.lastChild.disabled = false;
            }
        });

        // Disable the first and last card's index buttons since they have no effect
        cards[0].lastChild.firstChild.classList.add("disabled");
        cards[0].lastChild.firstChild.disabled = true;
        cards[cards.length - 2].lastChild.lastChild.classList.add("disabled");
        cards[cards.length - 2].lastChild.lastChild.disabled = true;
    }, [cards]);

    // TODO: Fix being unable to click padding around modal-container to close modal

    const addCard = () => {
        // Create a new card at the end of the deck, with placeholder text
        const newCard = {"index": cards.length, "question": "New question", "answer": "New answer"};
        setCards([...cards, newCard]);
        console.log(cards);
    }

    const increaseIndex = (currIndex) => {
        if (currIndex >= cards.length - 1) {
            console.log("Can't increase index, at bound");
            return;
        }

        const newCards = [...cards]; // Make a copy of the array

        const targetCard = newCards[currIndex + 1];
        newCards[currIndex + 1] = newCards[currIndex]; // Increase the moving card's index by 1
        newCards[currIndex + 1].index = currIndex + 1;

        targetCard.index = currIndex; // Change the target card's index to the index of the moved card
        newCards[currIndex] = targetCard;

        setCards(newCards);
    }

    const decreaseIndex = (currIndex) => {
        if (currIndex <= 0) {
            console.log("Can't decrease index, at bound");
            return;
        }

        const newCards = [...cards]; // Make a copy of the array

        const targetCard = newCards[currIndex - 1];

        newCards[currIndex - 1] = newCards[currIndex]; // Decrease the moving card's index by 1
        newCards[currIndex - 1].index = currIndex - 1;

        targetCard.index = currIndex; // Change the target card's index to the index of the moved card
        newCards[currIndex] = targetCard;

        setCards(newCards);
    }

    // TODO: Going from high postion to low doesn't work
    const moveCard = (currIndex, newIndexString) => {
        if (newIndexString === "") {
            // TODO: Allow blank again -- maybe select text on click
            return;
        }

        const newIndex = parseInt(newIndexString) - 1; // Convert back to a zero-based index

        if (isNaN(newIndex)) {
            console.log("Index is not a number");
            return;
        }

        console.log("moving card from position", currIndex + 1, "to", newIndex + 1);

        if (newIndex < 0 || newIndex >= cards.length) {
            console.log(`Index out of range (must be between 1 and ${cards.length})`);
        } else {
            console.log(cards);
            // Insert card at newIndex and create a copy of the array
            const adjustedCards = cards.toSpliced(newIndex + 1, 0, cards[currIndex]);
            adjustedCards.splice(currIndex, 1); // Remove original card

            // Fix the indexes
            for (let i = 0; i < adjustedCards.length; i++) {
                adjustedCards[i].index = i;
            }

            setCards(adjustedCards);
            console.log(adjustedCards);
        }
    }

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