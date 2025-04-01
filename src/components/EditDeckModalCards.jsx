import "./componentStyles/EditModalCards.css"

import deleteIcon from '../assets/icons/delete.svg';
import plusIcon from '../assets/icons/plus.svg';
import minusIcon from '../assets/icons/minus.svg';

export function EditDeckModalCards(props) {
    const card = props.card;

    function onInputFocusLost(target) {
        // If the input target is not valid alert the user
        if (!target.checkValidity()) {
            target.reportValidity();
        } else { // Otherwise, reset the input value once focus is lost (so there isn't 2 of the same positions shown
            target.value = card.index + 1;
        }
    }

    function onKeyDown(event) {
        // Return early if the user didn't press the enter key
        if (event.key !== "Enter") {
            return;
        }

        // If the input target is not valid alert the user
        if (!event.target.checkValidity()) {
            event.target.reportValidity();
        } else { // Otherwise, move the card
            props.moveCard(card.index, event.target.value, event);
        }
    }

    return (
        <>
            <div className="card edit-card">

                <span className="text-header">Question</span>
                <textarea required={true} name="question" placeholder="Question..." className="text-input"
                          value={card.question}
                          onChange={e => props.updateValue("question", card.index, e.target.value)}/>

                <span className="text-header">Answer</span>
                <textarea required={true} name="answer" placeholder="Answer..." className="text-input"
                          value={card.answer}
                          onChange={e => props.updateValue("answer", card.index, e.target.value, e)}/>

                <div className="card-footer">
                    <div className="placeholder"></div>
                    <div className="index-container">
                        <button type="button"
                                className={`card-btn ${card.index === 0 ? 'disabled' : ''}`}
                                title="Decrease card postion"
                                disabled={card.index === 0}
                                onClick={() => props.decreaseIndex(card.index)}>
                            <img src={minusIcon} alt="Minus icon"/>
                        </button>
                        <input type="number" required={true} className="index-number-input" value={card.position}
                               min={1}
                               max={props.maxIndex}
                               onChange={e => props.updatePosition(card.index, e.target.value)}
                               onKeyDown={e => onKeyDown(e)}
                               onBlur={e => onInputFocusLost(e.target)}
                        />
                        <button type="button"
                                className={`card-btn ${card.index === props.maxIndex - 1 ? 'disabled' : ''}`}
                                title="Increase card postion"
                                disabled={card.index === props.maxIndex - 1}
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
            <button type="button" id="new-card" className="card" onClick={() => props.addCard()}>
                <img src={plusIcon} alt="Plus icon"/>
                <span>New Card</span>
            </button>
        </>
    )
}