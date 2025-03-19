import "./componentStyles/EditDeckCard.css"
import {useState} from "react";

export function EditDeckCard(props) {

    /* TODO: Change icon for plus and minus buttons*/

    const [index, setIndex] = useState(parseInt(props.index));

    const increaseIndex = () => {
        props.moveCard(index, index + 1);

        setIndex(index + 1);
    }

    const decreaseIndex = () => {
        if (index > 0) {
            props.moveCard(index, index - 1);

            setIndex(index - 1);
        }
    }

    const changeIndex = (newIndexString) => {
        if (newIndexString === "") {
            setIndex("");
            return;
        }

        const newIndex = parseInt(newIndexString) - 1;

        if (!isNaN(newIndex) && newIndex > 0)
            setIndex(newIndex);
        else
            console.log("Invalid index");
    }

    // TODO: Make index change move cards and make sure this is valid (it was throwing errors in the console)

    return (
        <>
            <div className="edit-card">
                {/*<span>Card</span>*/}
                <span className="text-header">Question</span>
                <input type="text" placeholder="Question" className="text-input" value={props.question}/>

                <span className="text-header">Answer</span>
                <input type="text" placeholder="Answer" className="text-input" value={props.answer}/>

                <div className="index-container">
                    <button className="index-buttons" onClick={decreaseIndex}>-</button>
                    <input type="number" className="index-number-input" value={index + 1} onChange={e => changeIndex(e.target.value)} />
                    <button className="index-buttons" onClick={increaseIndex}>+</button>
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