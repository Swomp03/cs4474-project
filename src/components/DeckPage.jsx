import { useParams } from 'react-router-dom';

const DeckPage = () =>{
    const params = useParams();
    console.log(params)
    return(
        <>
            <div>
                <h1>Deck Page</h1>
            </div>
        </>
    )
}

export default DeckPage;