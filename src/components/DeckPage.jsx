import './componentStyles/DeckPage.css'

import { useNavigate, useParams } from 'react-router-dom';
import { loadData } from '../utils/localStorage';
import EditDeckModal from "./EditDeckModal.jsx";
import useToggle from "./hooks/useToggle.js";
import usePageTitle from "./hooks/setTitle.js";

import returnArrow from "../assets/icons/arrow_back.svg";

const DeckPage = () =>{
    const { folderId, deckId } = useParams();

    const navigate = useNavigate();
    const data = loadData();
    const folder = data.find(f => f.id === folderId);
    
    const foundDeck = folder?.decks.find(d => d.id === deckId);

    const { state: visible, toggle: toggleVisibility } = useToggle();

    usePageTitle(foundDeck.name + " | Anki+");

    const handleStudyNow = () => {
        navigate(`/playpage/${folderId}/${deckId}`);
      };

    console.log("Found deck:", foundDeck);
    return(
        <>
            {visible && <EditDeckModal toggleVisibility={toggleVisibility} cards={foundDeck.cards}
                                       folderId={folderId} deckId={deckId} />}

            <div className="page-container">
                <button id='return-button' className="large-btn default-btn img-btn" title="Return to the previous page"
                        onClick={() => navigate("/")}>
                    <img src={returnArrow} alt="Back arrow"/>
                    Return
                </button>

                <div id='deck-body'>
                <h1 id='deck-name'>{foundDeck.name}</h1>
                    <h3 id='deck-subtitle'><i>{foundDeck.description}</i></h3>
                    <h2 id='number-of-cards'>Number of cards: {foundDeck.cards.length}</h2>
                    <div id='deck-button-section'>
                        <button id='edit-deck-button' className='deck-button default-btn' title="Add, remove, and reorder cards"
                                onClick={toggleVisibility}>Edit Deck</button>
                        <button id='study-now-button' className='deck-button primary-btn' onClick={handleStudyNow}
                                disabled={foundDeck.cards.length === 0}>Study Now</button>
                        </div>
                </div>
            </div>
        </>
    )
}

export default DeckPage;