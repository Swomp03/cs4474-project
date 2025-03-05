import "./componentStyles/Home.css"
import DeckFolder from "./DeckFolder"

const Home = () =>{

    const folders = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    return(
        <>
            <div className="home-header">
                <button id="edit-layout-button">Edit Layout</button>
                <h1>Decks</h1>
                <button id="new-folder-button">+ New Folder</button>
            </div>

            <div className="deck-folders">
                {folders.map((folder) => (
                    <div key={folder} className="deck-folder-group">
                        <DeckFolder></DeckFolder>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home