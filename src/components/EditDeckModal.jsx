import "./componentStyles/EditModal.css";

import {saveCards} from "../utils/localStorage.js";
import {EditDeckModalCards, AddDeckCard} from "./EditDeckModalCards.jsx";
import {useState} from "react";

import cancel from "../assets/icons/cancel.svg"
import save from "../assets/icons/save.svg"

const EditDeckModal = (props) => {
    const [cards, setCards] = useState(props.cards);

    const addCard = () => {
        // Create a new card at the end of the deck, with placeholder text
        const newCard = {
            "index": cards.length,
            "position": cards.length + 1,
            "question": "",
            "answer": ""
        };
        setCards([...cards, newCard]);
    }

    const removeCard = (index) => {
        if (index < 0 || index >= cards.length) {
            console.log(`Index out of range (must be between 0 and ${cards.length - 1})`);
            return;
        }

        console.log("Removing card at", index);

        const adjustedCards = [...cards];

        adjustedCards.splice(index, 1); // Delete card at index

        // Fix the indexes
        for (let i = 0; i < adjustedCards.length; i++) {
            adjustedCards[i].index = i;
            adjustedCards[i].position = i + 1;
        }

        setCards(adjustedCards);
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
        if (currIndex <= 0) {
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

    const updatePosition = (currIndex, newPositionString) => {
        const newPosition = parseInt(newPositionString); // Caveat: This can result in NaN if "" but this is intentional

        // Log a warning but allow out of range values (the HTML validation will handle it)
        if (newPosition < 0 || newPosition > cards.length) {
            console.log(`Position ${newPosition} out of range (must be between 1 and ${cards.length})`);
        }

        const newCards = [...cards]; // Make a copy of the array
        newCards[currIndex].position = newPosition;
        setCards(newCards);
    }

    const moveCard = (currIndex, newPositionString, event) => {
        if (newPositionString === "") return;

        const newIndex = parseInt(newPositionString) - 1;

        if (isNaN(newIndex)) {
            console.log("Index is not a number");
            return;
        }

        console.log("Moving card from index", currIndex, "to", newIndex);

        if (newIndex < 0 || newIndex > cards.length - 1) {
            console.log(`Index ${newIndex} out of range (must be between 0 and ${cards.length - 1})`);
        } else {
            const adjustedCards = [...cards];

            const movingCard = adjustedCards.splice(currIndex, 1)[0]; // Remove original card
            adjustedCards.splice(newIndex, 0, movingCard); // Insert the moving card

            // Fix all the indexes and positions
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

    const cancelEdits = () => {
        const cancel = confirm(`Are you sure you want to cancel? Your changes will be lost`);
        if (cancel)
            props.toggleVisibility();
    }

    const saveEdits = (event) => {
        event.preventDefault();

        saveCards(props.folderId, props.deckId, cards);
        props.toggleVisibility();
    }

    return (
        <div id="modal-root" className="static">
            <div id="modal-background" onClick={() => cancelEdits()}/>

            <div id="modal-container">
                <div id="modal-body">
                    <div id="modal-header">
                        <button type="button" className="header-btn modal-btn default-btn img-btn"
                                onClick={() => cancelEdits()}>
                            <img src={cancel} alt="Cancel icon"/>
                            Cancel
                        </button>
                        <h1>Edit Deck</h1>
                        <button type="submit" className="header-btn primary-btn img-btn" form="cards-container">
                            <img src={save} alt="Save icon"/>
                            Save
                        </button>
                    </div>

                    <form id="cards-container" className="group-container" onSubmit={saveEdits}>
                        {cards.map((card, index) => (
                            <EditDeckModalCards key={index} card={card} maxIndex={cards.length}
                                                updateValue={updateValue} increaseIndex={increaseIndex}
                                                decreaseIndex={decreaseIndex} moveCard={moveCard}
                                                updatePosition={updatePosition} removeCard={removeCard}/>
                        ))}
                        <AddDeckCard addCard={addCard}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditDeckModal;