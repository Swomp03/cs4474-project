import "./componentStyles/EditDeckModal.css";

import {useParams} from "react-router-dom";
import {loadData} from "../utils/localStorage.js";
import EditDeckCard from "./EditDeckCard.jsx";

const EditDeckModal = () => {

    const cards = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return (
        <div className="static">
            <div id="modal-background"></div>

            <div id="modal-container">
                <div id="modal-body">
                    <div id="modal-header">
                        <button>Cancel</button>
                        <h1>Hi</h1>
                        <button>Save</button>
                    </div>

                    <div id="cards-container">
                        {cards.map((card) => (
                            <EditDeckCard></EditDeckCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDeckModal;