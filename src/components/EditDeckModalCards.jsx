import "./componentStyles/EditModalCards.css"

import deleteIcon from '../assets/icons/delete.svg';
import plusIcon from '../assets/icons/plus.svg';
import minusIcon from '../assets/icons/minus.svg';

export function EditDeckCard(props) {
    const card = props.card;

    function onInputFocusLost(target) {
        // Reset the input value once focus is lost (so there isn't 2 of the same positions shown)
        target.value = props.currIndex + 1;
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
            props.moveFolder(props.currIndex, event.target.value, event);
        }
    }

    return (
        <>
            <div className="card edit-card">

                <span className="text-header">Question</span>
                <textarea required={true} name="question" placeholder="Enter a question..." className="text-input"
                          value={card.question}
                          onChange={e => props.updateValue("question", card.index, e.target.value)}/>

                <span className="text-header">Answer</span>
                <textarea required={true} name="answer" placeholder="Enter the answer..." className="text-input"
                          value={card.answer}
                          onChange={e => props.updateValue("answer", props.currIndex, e.target.value, e)}/>

                <div className="card-footer">
                    <div className="placeholder"></div>
                    <div className="index-container">
                        <button type="button"
                                className={`card-btn ${props.currIndex === 0 ? 'disabled' : ''}`}
                                title="Decrease card postion"
                                disabled={props.currIndex === 0}
                                onClick={e => props.decreaseIndex(props.currIndex, e)}>
                            <img src={minusIcon} alt="Minus icon"/>
                        </button>
                        <input type="number" required={true} className="index-number-input" value={card.position}
                               min={1}
                               max={props.maxIndex}
                               form="n/a" // Prevent the input from submitting
                               onChange={e => props.updatePosition(props.currIndex, e.target.value)}
                               onKeyDown={e => onKeyDown(e)}
                               onBlur={e => onInputFocusLost(e.target)}
                        />
                        <button type="button"
                                className={`card-btn ${props.currIndex === props.maxIndex - 1 ? 'disabled' : ''}`}
                                title="Increase card postion"
                                disabled={props.currIndex === props.maxIndex - 1}
                                onClick={e => props.increaseIndex(props.currIndex, e)}>
                            <img src={plusIcon} alt="Plus icon"/>
                        </button>
                    </div>
                    <button type="button" className="card-btn" title="Delete this card"
                            onClick={() => props.removeCard(props.currIndex)}>
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
            <button type="button" id="new-card" className="card" onClick={() => props.addNewCard()}>
                <img src={plusIcon} alt="Plus icon"/>
                <span>New Card</span>
            </button>
        </>
    )
}