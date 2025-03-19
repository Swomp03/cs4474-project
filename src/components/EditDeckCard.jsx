import "./componentStyles/EditDeckCard.css"

export function EditDeckCard(props) {

    /* TODO: Change icon for plus and minus buttons*/

    return (
        <>
            <div className="edit-card">
                {/*<span>Card</span>*/}
                <span className="text-header">Question</span>
                <input type="text" placeholder="Question" className="text-input" value={props.question}/>

                <span className="text-header">Answer</span>
                <input type="text" placeholder="Answer" className="text-input" value={props.answer}/>

                <div className="index-container">
                    <button className="index-buttons">-</button>
                    <input type="text" className="index-number-input" value={props.index}/>
                    <button className="index-buttons">+</button>
                </div>
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