import "./componentStyles/DeckFolder.css"

const DeckFolder = () =>{

    const decks = [
        {
            name: "deck1",
            description: "Lorem ipsum"
        }, 
        {
            name: "deck2",
            description: "dolor sit amet"
        }, 
        {
            name: "deck3",
            description: "Et voluptate"
        }
    ]

    return(
        <>
            <div className="folder-div">
                <button className="folder-button">Folder Name</button>
                <div className="dropdown-group">
                    <button className="add-new-deck-button">+ Add New Deck</button>
                    {decks.map((deck) => (
                        <div key={deck.name} className="deck-group">
                            <p className="deck-name">{deck.name}</p>
                            <p className="deck-description">{deck.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DeckFolder