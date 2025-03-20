import "./componentStyles/EditDeckCard.css"

/* TODO: Change icon for plus and minus buttons*/

// TODO: Change file and card names

export function EditDeckCard(props) {
    const card = props.card;

    // onBlur={e => props.resetPosition(card.index, e.target.value)}

    return (
        <>
            <div className="edit-card">

                <span className="text-header">Question</span>
                <input type="text" name="question" placeholder="Question..." className="text-input" value={card.question}
                       onChange={e => props.updateValue("question", card.index, e.target.value)}/>

                <span className="text-header">Answer</span>
                <input type="text" name="answer" placeholder="Answer..." className="text-input" value={card.answer}
                       onChange={e => props.updateValue("answer", card.index, e.target.value, e)}/>

                <div className="card-footer">
                    <div className="placeholder"></div>
                    <div className="index-container">
                        <button className="index-buttons" title="Decrease card postion" onClick={() => props.decreaseIndex(card.index)}>-</button>
                        <input type="number" className="index-number-input" value={card.position}
                               onChange={e => props.updatePosition(card.index, e.target.value)}
                               onKeyDown={e => props.moveCard(card.index, e.target.value, e)}
                        />
                        <button className="index-buttons" title="Increase card postion" onClick={() => props.increaseIndex(card.index)}>+</button>
                    </div>
                    <button type="button" className="delete-card-btn" title="Delete this card" onClick={() => props.removeCard(card.index)}>X</button>
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