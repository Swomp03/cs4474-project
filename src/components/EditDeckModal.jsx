import "./componentStyles/EditDeckModal.css";

import {useParams} from "react-router-dom";
import {loadData} from "../utils/localStorage.js";
import {EditDeckCard, AddDeckCard} from "./EditDeckCard.jsx";
import {useEffect, useState} from "react";

// TODO: Make escape hide modal as well?
// TODO: Fix being unable to click padding around modal-container to close modal

const EditDeckModal = (props) => {
    const defaultCards = [
        {"index": 0, "position": 1, "question": "HI?", "answer": "HELLO"},
        {"index": 1, "position": 2, "question": "test?", "answer": "123"},
        {"index": 2, "position": 3, "question": "Anyone home?", "answer": "Yes"},
        {"index": 3, "position": 4, "question": "9 + 10?", "answer": "21"}
    ];

    const [cards, setCards] = useState(defaultCards);

    // Used to disabled the index buttons when it makes sense
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

    const addCard = () => {
        // Create a new card at the end of the deck, with placeholder text
        const newCard = {
            "index": cards.length,
            "position": cards.length + 1,
            "question": "New question",
            "answer": "New answer"
        };
        setCards([...cards, newCard]);
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
        newCards[currIndex + 1].position = currIndex + 2;

        targetCard.position = currIndex + 1;
        targetCard.index = currIndex; // Change the target card's index to the index of the moved card
        newCards[currIndex] = targetCard;

        setCards(newCards);
    }

    const decreaseIndex = (currIndex) => {
        if (currIndex < 1) {
            console.log("Can't decrease index, at bound");
            return;
        }

        const newCards = [...cards]; // Make a copy of the array

        const targetCard = newCards[currIndex - 1];

        newCards[currIndex - 1] = newCards[currIndex]; // Decrease the moving card's index by 1
        newCards[currIndex - 1].index = currIndex - 1;
        newCards[currIndex - 1].position = currIndex;

        targetCard.position = currIndex + 1;
        targetCard.index = currIndex; // Change the target card's index to the index of the moved card
        newCards[currIndex] = targetCard;

        setCards(newCards);
    }

    // TODO: Re-enable again
    const resetPosition = (currIndex, currentValueString) => {
        console.log("Reset pos")
        console.log(`currIndex: ${currIndex}`);

        const currentValue = parseInt(currentValueString);

        if (isNaN(currentValue) || currentValue < 0 || currentValue >= cards.length) {
            const newCards = [...cards]; // Make a copy of the array

            console.log(newCards[currIndex]);
            console.log(newCards);

            newCards[currIndex].position = currIndex + 1;

            try {
                setCards(newCards);
            } catch {
                // ignore any errors since we want to be able to enter blank values
            }
        }
    }

    const updatePosition = (currIndex, newIndexString) => {
        const newIndex = parseInt(newIndexString);

        if (newIndex < 0 || newIndex >= cards.length) {
            console.log(`Index out of range (must be between 0 and ${cards.length - 1})`);
        }

        const newCards = [...cards]; // Make a copy of the array

        newCards[currIndex].position = newIndex;

        try {
            setCards(newCards);
        } catch {
            // ignore any errors since we want to be able to enter blank values
        }
    }

    const moveCard = (currIndex, newIndexString, event) => {
        // Return early if the user didn't press the enter key
        if (event.key !== "Enter") {
            return;
        }

        if (newIndexString === "") {
            event.target.blur(); // Remove focus
            return;
        }

        const newIndex = parseInt(newIndexString); // Convert back to a zero-based index

        if (isNaN(newIndex)) {
            console.log("Index is not a number");
            return;
        }

        // If currIndex > newIndex then the change is negative so the diff is -1, otherwise it is 0
        let diff = currIndex > newIndex ? -1 : 0;

        console.log("moving card from position", currIndex + 1, "to", newIndex);

        if (newIndex < 0 || newIndex > cards.length) {
            console.log(`Index out of range (must be between 1 and ${cards.length})`);
        } else {
            const adjustedCards = [...cards];

            const movingCard =  adjustedCards.splice(currIndex, 1)[0]; // Remove original card
            adjustedCards.splice(newIndex + diff, 0, movingCard); // Insert the moving card

            // Fix the indexes
            for (let i = 0; i < adjustedCards.length; i++) {
                adjustedCards[i].index = i;
                adjustedCards[i].position = i + 1;
            }

            setCards(adjustedCards);
            event.target.blur(); // Remove focus
        }
    }

    const updateValue = (valueName, index, value) => {
        const updatedCards = [...cards];

        switch (valueName) {
            case "answer":
                updatedCards[index].answer = value;
                break;
            case "question":
                updatedCards[index].question = value;
                break;
            default:
                console.log("Invalid value name");
                return;
        }

        setCards(updatedCards);
    }

    // TODO: Surround cards container in form
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
                            <EditDeckCard key={index} card={card} increaseIndex={increaseIndex}
                                          decreaseIndex={decreaseIndex} moveCard={moveCard}
                                          updateValue={updateValue} updatePosition={updatePosition}
                                          resetPosition={resetPosition}></EditDeckCard>
                        ))}
                        <AddDeckCard addCard={addCard}></AddDeckCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDeckModal;