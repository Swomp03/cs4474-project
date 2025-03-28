import './componentStyles/DeckPage.css'

import { useNavigate, useParams } from 'react-router-dom';
import { loadData } from '../utils/localStorage';
import EditDeckModal from "./EditDeckModal.jsx";
import useToggle from "./hooks/useToggle.js";

const DeckPage = () =>{
    const { folderId, deckId } = useParams();

    const navigate = useNavigate();
    const data = loadData();
    const folder = data.find(f => f.id === folderId);
    
    const foundDeck = folder?.decks.find(d => d.id === deckId);

    const { state: visible, toggle: toggleVisibility } = useToggle();

    const handleStudyNow = () => {
        navigate(`/playpage/${folderId}/${deckId}`);
      };

    console.log("Found deck:", foundDeck);
    return(
        <>
            <div className="page-container">
                <button id='return-button' className="large-btn default-btn" onClick={() => navigate(-1)}>Return</button>

                <div id='deck-body'>
                    <h1 id='deck-name'>{foundDeck.name}</h1>
                    <h3 id='deck-subtitle'><i>{foundDeck.description}</i></h3>
                    <h2 id='number-of-cards'>Number of cards: {foundDeck.cards.length}</h2>
                    <div id='deck-button-section'>
                        <button id='edit-deck-button' className='deck-button default-btn' onClick={toggleVisibility}>Edit Deck</button>
                        <button id='study-now-button' className='deck-button primary-btn' onClick={handleStudyNow}>Study Now</button>
                        </div>
                </div>
            </div>
            {visible && <EditDeckModal toggleVisibility={toggleVisibility} cards={foundDeck.cards}
                                       folderId={folderId} deckId={deckId}></EditDeckModal>}
        </>
    )
}

export default DeckPage;