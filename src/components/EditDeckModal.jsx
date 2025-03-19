import "./componentStyles/EditDeckModal.css";

import {useParams} from "react-router-dom";
import {loadData} from "../utils/localStorage.js";
import {EditDeckCard, AddDeckCard} from "./EditDeckCard.jsx";

// TODO: Make escape hide modal as well?

const EditDeckModal = (props) => {

    const cards = [{"question": "HI?", "answer": "HELLO"}, {"question": "test?", "answer": "123"},
        {"question": "Anyone home?", "answer": "Yes"}, {"question": "9 + 10?", "answer": "21"}];

    return (
        <div className="static">
            <div id="modal-background" onClick={() => props.toggle()}></div>

            <div id="modal-container">
                <div id="modal-body">
                    <div id="modal-header">
                        <button className={"header-btn"} onClick={() => props.toggle()}>Cancel</button>
                        <h1>Edit Deck</h1>
                        <button className={"header-btn save-btn"}>Save</button>
                    </div>

                    <div id="cards-container">
                        {cards.map((card, index) => (
                            <EditDeckCard key={card} index={index + 1} question={card.question} answer={card.answer}></EditDeckCard>
                        ))}
                        <AddDeckCard></AddDeckCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDeckModal;