import "./componentStyles/EditDeckCard.css"

/* TODO: Change icon for plus and minus buttons*/
// TODO: Change file and card names

export function EditDeckCard(props) {
    return (
        <>
            <div className="edit-card">
                {/*<span>Card</span>*/}
                <span className="text-header">Question</span>
                <input type="text" placeholder="Question" className="text-input" value={props.question}/>

                <span className="text-header">Answer</span>
                <input type="text" placeholder="Answer" className="text-input" value={props.answer}/>

                <div className="index-container">
                    <button className="index-buttons" onClick={() => props.decreaseIndex(props.index)}>-</button>
                    <input type="number" className="index-number-input" value={props.index + 1}
                           onChange={e => props.moveCard(props.index, e.target.value)}/>
                    <button className="index-buttons" onClick={() => props.increaseIndex(props.index)}>+</button>
                </div>
            </div>
        </>
    )
}

export function AddDeckCard(props) {
    return (
        <>
            <button id="new-card" onClick={() => props.addCard()}>
                <span>+ New Card</span>
            </button>
        </>
    )
}