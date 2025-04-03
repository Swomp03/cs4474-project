import "./componentStyles/DeckFolder.css"

import {addDeck, deleteDeck, loadData} from "../utils/localStorage";
import {useState} from "react";

import useToggle from "./hooks/useToggle.js";

// import editIcon from "../assets/icons/edit.svg";
import arrowDropdown from "../assets/icons/arrow_drop_down.svg";
import deleteIcon from "../assets/icons/delete.svg";
import plusIcon from "../assets/icons/plus.svg";
import cancel from "../assets/icons/cancel.svg";

// TODO: Store visible state so it remembers on page load?

const DeckFolder = (props) => {
    const folderName = props.folder.name;
    const decks = props.folder.decks;
    const folderId = props.folder.id;

    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");

    const {state: folderContentsVisible, toggle: toggleFolderContentsVisibility} = useToggle(true);
    const {state: newDeckCardHidden, toggle: toggleNewDeckCard} = useToggle();

    const dropdownId = "dropdown-" + folderId;
    const newDeckId = "new-deck-" + folderId;
    const newDeckBtnId = "new-deck-btn-" + folderId;

    const handleAddDeck = (e) => {
        e.preventDefault();
        if (!deckName.trim()) return;
        if (!deckDescription.trim()) return;

        addDeck(folderId, deckName, deckDescription);

        setDeckName("");
        setDeckDescription("");
        props.updateFolders(loadData()); // Update the page without fully reloading
        toggleNewDeckVis(); // Hide the new deck card container
    }

    const handleDeleteDeck = (e, deckId, deckName) => {
        e.preventDefault();
        let deleteText = `Are you sure you want to delete "${deckName}"?`;
        if (confirm(deleteText)) {
            deleteDeck(folderId, deckId);
            props.updateFolders(loadData()); // Update the page without fully reloading
        }
    }

    const handleCancelAddingDeck = () => {
        setDeckName("");
        setDeckDescription("");

        toggleNewDeckVis(); // Hide the new deck card container
    }

    const toggleNewDeckVis = () => {
        const newDeck = document.getElementById(newDeckId);
        const newDeckBtn = document.getElementById(newDeckBtnId);

        toggleNewDeckCard();

        if (newDeck && newDeckCardHidden) {
            newDeck.classList.add("hidden-container");

            setTimeout(() => {
                newDeck.classList.add("hidden");
                newDeckBtn.classList.remove("hidden");
            }, 280)
        } else if (newDeck) {
            newDeck.classList.remove("hidden");

            setTimeout(() => {
                newDeck.classList.remove("hidden-container");
                newDeckBtn.classList.add("hidden");
            }, 10)
        }
    }

    return (
        <>
            <div className="folder-div">
                <div className="folder-header-container">
                    <span className="folder-name display-3-lines"
                          title={folderName.length > 45 ? folderName : null}>{folderName}</span>

                    <button className={`folder-header-btn ${!folderContentsVisible ? "rotated-90" : ""}`}
                            onClick={toggleFolderContentsVisibility}>
                        <img src={arrowDropdown} alt="Dropdown icon"/>
                    </button>
                </div>

                <div id={dropdownId} className={`dropdown-group ${folderContentsVisible ? "expanded" : ""}`}>
                    <button type="button" id={newDeckBtnId} className="default-btn img-btn show-new-deck-container-btn"
                            onClick={toggleNewDeckVis}>
                        <img src={plusIcon} alt="Plus icon"/>
                        New Deck
                    </button>

                    <div id={newDeckId} className={`new-deck-container hidden hidden-container`}>
                        <h2>New Deck</h2>
                        <form className="new-deck-form" onSubmit={handleAddDeck}>
                            <input type="text" required={true} className="deck-text-input" placeholder="Enter deck name..."
                                   value={deckName}
                                   onChange={(e) => setDeckName(e.target.value)}/>
                            <input type="text" required={true} className="deck-text-input" placeholder="Enter deck description..."
                                   value={deckDescription}
                                   onChange={(e2) => setDeckDescription(e2.target.value)}/>

                            <div className="new-deck-form-controls">
                                <button type="submit" className="primary-btn img-btn">
                                    <img src={plusIcon} alt="Plus icon"/>
                                    Add
                                </button>

                                <button type="button" className="default-btn img-btn cancel-btn" onClick={handleCancelAddingDeck}>
                                    <img src={cancel} alt="Cancel icon"/>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    {decks.map((deck) => (
                        <a key={deck.id} href={`/deckpage/${folderId}/${deck.id}`} className="deck-link">
                            <div className="card-stack">
                                <div className="deck-card card-3"></div>
                                <div className="deck-card card-2"></div>
                                <div className="deck-card card-1">
                                    <div className="deck-card-content">
                                        <div className="deck-card-text-area">
                                            <p className="deck-name display-3-lines"
                                               title={deck.name.length > 65 ? deck.description : null}>{deck.name}</p>
                                            <p className="deck-description display-3-lines"
                                               title={deck.description.length > 80 ? deck.description : null}>
                                                <i>{deck.description}</i>
                                            </p>
                                        </div>

                                        <button className="card-btn delete-deck-btn"
                                                onClick={(e) => handleDeleteDeck(e, deck.id, deck.name)}>
                                            <img src={deleteIcon} alt="Delete Icon"/>
                                        </button>
                                        {/* <img src={editIcon} alt="Edit Icon"/> */}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DeckFolder