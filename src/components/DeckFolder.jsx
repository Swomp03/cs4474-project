import "./componentStyles/DeckFolder.css"

import {addDeck, loadData} from "../utils/localStorage";
import {useEffect, useState} from "react";

import editIcon from "../assets/icons/edit.svg";
import arrowDropdown from "../assets/icons/arrow_drop_down.svg";
import useToggle from "./hooks/useToggle.js";

// TODO: Store visible state so it remembers on page load?

const DeckFolder = (props) =>{
    const folderName = props.folder.name;
    const decks = props.folder.decks;
    const folderId = props.folder.id;

    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");

    const { state: visible, toggle: toggleVisibility } = useToggle(true);

    const dropdownId = "dropdown-" + folderId;

    const handleAddDeck = (e) =>{
        e.preventDefault();
        if(!deckName.trim()) return;
        if(!deckDescription.trim()) return;

        addDeck(folderId, deckName, deckDescription);
        
        setDeckName("");
        setDeckDescription("");
        window.location.reload();
    }

    useEffect(() => {
        const dropdown = document.getElementById(dropdownId);
        const isHidden = dropdown.classList.contains('hidden-folder');

        // Close the dropdown by setting the height to 0
        if (isHidden) {
            const currentHeight = dropdown.offsetHeight;
            dropdown.style.height = currentHeight + 'px';

            // Force browser to acknowledge the height
            setTimeout(() => {
                dropdown.style.height = '0px';
            }, 5);
        } else { // Otherwise, open the dropdown by setting the height back to normal
            dropdown.style.height = 'auto';
            const targetHeight = dropdown.offsetHeight;
            dropdown.style.height = '0px';

            // Force browser to acknowledge the change
            setTimeout(() => {
                dropdown.style.height = targetHeight + 'px';
            }, 15);
        }
    });

    return(
        <>
            <div className="folder-div">
                {/* <div>
                    <h2>Create a New Folder</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter Folder Name" value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
                        <button type="submit">Add Folder</button>
                    </form>
                </div> */}

                <div className="folder-header-container">
                    <span className="folder-name">{folderName}</span>
                    <button className={visible ? "folder-header-btn" : "folder-header-btn rotated-90"} onClick={toggleVisibility}>
                        <img src={arrowDropdown} alt="Dropdown icon"/>
                    </button>
                </div>
                
                <div id={dropdownId} className={visible ? "dropdown-group" : "dropdown-group hidden-folder"}>
                    <div className="new-deck-background">
                        <h2>New Deck:</h2>
                        <form onSubmit={handleAddDeck}>
                            <input type="text" placeholder="Enter Deck Name" value={deckName} onChange={(e) => setDeckName(e.target.value)}/>
                            <input type="text" placeholder="Enter Deck Desc." value={deckDescription} onChange={(e2) => setDeckDescription(e2.target.value)}/>
                            <button type="submit" className="default-btn">+ Add Deck</button>
                        </form>
                    </div>

                    {decks.map((deck) => (
                        <a href={`/deckpage/${folderId}/${deck.id}`} className="deck-link">
                            <div key={deck.id} className="deck-group card-stack">
                                <div className="deck-card card-3"></div>
                                <div className="deck-card card-2"></div>
                                <div className="deck-card card-1">
                                    <p className="deck-name display-3-lines">{deck.name} <img src={editIcon} alt="Edit Icon"/></p>
                                    <p className="deck-description display-3-lines"><i>{deck.description}</i></p>
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