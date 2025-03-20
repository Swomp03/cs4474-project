import "./componentStyles/EditDeckCard.css"
import deleteIcon from '../assets/icons/delete.svg';
import plusIcon from '../assets/icons/plus.svg';
import minusIcon from '../assets/icons/minus.svg';

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
                        <button className="card-btn" title="Decrease card postion"
                                onClick={() => props.decreaseIndex(card.index)}>
                            <img src={minusIcon} alt="Minus icon"/>
                        </button>
                        <input type="number" className="index-number-input" value={card.position}
                               onChange={e => props.updatePosition(card.index, e.target.value)}
                               onKeyDown={e => props.moveCard(card.index, e.target.value, e)}
                        />
                        <button className="card-btn" title="Increase card postion"
                                onClick={() => props.increaseIndex(card.index)}>
                            <img src={plusIcon} alt="Plus icon"/>
                        </button>
                    </div>
                    <button type="button" className="card-btn" title="Delete this card"
                            onClick={() => props.removeCard(card.index)}>
                        <img src={deleteIcon} alt="Delete icon"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export function AddDeckCard(props) {
    return (
        <>
            <button id="new-card" onClick={() => props.addCard()}>
                <img src={plusIcon} alt="Plus icon"/>
                <span>New Card</span>
            </button>
        </>
    )
}