import './componentStyles/DeckPage.css'
import { useParams } from 'react-router-dom';
import { loadData, saveData } from '../utils/localStorage';
import { useState } from 'react';
import EditDeckModal from "./EditDeckModal.jsx";
import useToggle from "./hooks/useToggle.js";

const DeckPage = () =>{
    const { folderId, deckId } = useParams();
    // console.log(folderId, deckId);

    const data = loadData();
    const folder = data.find(f => f.id === folderId);
    const foundDeck = folder?.decks.find(d => d.id === deckId);

    const { state: visible, toggle } = useToggle();

    console.log("Found deck:", foundDeck);
    return(
        <>
            <a href="/"><button id='return-button'>Return</button></a>
        
            <div id='deck-body'>
                <h1 id='deck-name'>{foundDeck.name}</h1>
                <h3 id='deck-subtitle'><i>{foundDeck.description}</i></h3>
                <h2 id='number-of-cards'>Number of cards: {foundDeck.cards.length}</h2>
                <div id='deck-button-section'>
                    <button className='deck-button' id='edit-deck-button' onClick={toggle}>Edit Deck</button>
                    <button className='deck-button' id='study-now-button'>Study Now</button>
                </div>
            </div>
            {visible && <EditDeckModal toggle={toggle}></EditDeckModal>}
        </>
    )
}

export default DeckPage;