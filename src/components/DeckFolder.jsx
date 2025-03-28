import "./componentStyles/DeckFolder.css"

import { addDeck } from "../utils/localStorage";
import { useState } from "react";
import editIcon from "../assets/icons/edit.svg";

const DeckFolder = (props) =>{

    const folderName = props.folder.name;
    const decks = props.folder.decks;
    const folderId = props.folder.id;

    // const decks = [
    //     {
    //         name: "deck1",
    //         description: "Lorem ipsum"
    //     }, 
    //     {
    //         name: "deck2",
    //         description: "dolor sit amet"
    //     }, 
    //     {
    //         name: "deck3",
    //         description: "Et voluptate"
    //     }
    // ]

    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");

    const handleAddDeck = (e) =>{
        e.preventDefault();
        if(!deckName.trim()) return;
        if(!deckDescription.trim()) return;

        addDeck(folderId, deckName, deckDescription);
        
        setDeckName("");
        setDeckDescription("");
        window.location.reload();
    }

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
                
                <button className="folder-button">{folderName}</button>
                
                <div className="dropdown-group">
                    {/* <button className="add-new-deck-button">+ Add New Deck</button> */}

                    <div className="new-deck-background">
                        <h2>New Deck:</h2>
                        <form onSubmit={handleAddDeck}>
                            <input type="text" placeholder="Enter Deck Name" value={deckName} onChange={(e) => setDeckName(e.target.value)}/>
                            <input type="text" placeholder="Enter Deck Desc." value={deckDescription} onChange={(e2) => setDeckDescription(e2.target.value)}/>
                            <button type="submit" className="default-btn">+ Add Deck</button>
                        </form>
                    </div>

                    {decks.map((deck) => (
                        <a href={`/deckpage/${folderId}/${deck.id}`}>
                            <div key={deck.id} className="deck-group">
                                <p className="deck-name">{deck.name} <img src={editIcon} alt="Edit Icon" /></p>
                                <p className="deck-description display-4-lines"><i>{deck.description}</i></p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DeckFolder