import "./componentStyles/EditDeckCard.css"

export function EditDeckCard() {

    return (
        <>
            <div className="edit-card">
                <h2>Question</h2>
                <h2>Answer</h2>
            </div>
        </>
    )
}

export function AddDeckCard() {
    return (
        <>
            <button id="new-card" onClick={() => console.log("HI")}>
                <span>+ New Card</span>
            </button>
        </>
    )
}