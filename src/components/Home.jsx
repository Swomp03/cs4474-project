import "./componentStyles/Home.css"


const Home = () =>{

    const folders = ["CompSci", "Biology", "Math", "Chem"]

    return(
        <>
            <div className="home-header">
                <button id="edit-layout-button">Edit Layout</button>
                <h1>Decks</h1>
                <button id="new-folder-button">+ New Folder</button>
            </div>

            <div className="deck-folders">
                {folders.map((folder) => (
                    <p key={folder}>{folder}</p>
                ))}
            </div>
        </>
    )
}

export default Home