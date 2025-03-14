import './componentStyles/DeckPage.css'
import { useParams } from 'react-router-dom';

const DeckPage = () =>{
    const params = useParams();
    console.log(params)
    return(
        <>
            <button id='return-button'>Return</button>
        
            <div id='deck-body'>
                <h1 id='deck-name'>Deck Name</h1>
                <h3 id='deck-subtitle'><i>Deck Subtitle</i></h3>
                <h2 id='number-of-cards'>Number of cards:</h2>
                <div id='deck-button-section'>
                    <button className='deck-button' id='edit-deck-button'>Edit Deck</button>
                    <button className='deck-button' id='study-now-button'>Study Now</button>
                </div>
            </div>
        </>
    )
}

export default DeckPage;