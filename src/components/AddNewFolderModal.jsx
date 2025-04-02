import "./componentStyles/EditModal.css";
import "./componentStyles/EditModalCards.css";

import {saveCards} from "../utils/localStorage.js";
import {EditDeckCard, AddDeckCard} from "./EditDeckModalCards.jsx";
import {useState} from "react";

import cancel from "../assets/icons/cancel.svg"
import save from "../assets/icons/save.svg"
import {EditFolderCard} from "./EditFoldersModalCards.jsx";
import minusIcon from "../assets/icons/minus.svg";
import plusIcon from "../assets/icons/plus.svg";
import deleteIcon from "../assets/icons/delete.svg";


// TODO: FINISH ME PLEASE!!!! -- Copy changes from other modals

const AddNewFolderModal = (props) => {
    // const [cards, setCards] = useState(props.cards);
    const folder = useState({})

    return (
        <div id="modal-root" className="static">
            <div id="modal-background" onClick={() => props.toggleVisibility()} />

            <div id="modal-container">
                <div id="modal-body">
                    <div id="modal-header">
                        <button type="button" className="header-btn modal-btn default-btn img-btn" onClick={() => props.toggleVisibility()}>
                            <img src={cancel} alt="Cancel icon" />
                            Cancel
                        </button>
                        <h1>Add Folder</h1>
                        <button type="submit" className="header-btn primary-btn img-btn" form="cards-container">
                            <img src={save} alt="Save icon" />
                            Save
                        </button>
                    </div>

                    <form id="cards-container" className="group-container">
                        <div className="card edit-card">
                            <span className="text-header">Folder Name</span>
                            <textarea required={true} name="name" placeholder="Enter folder name..." className="text-input"
                                      value={folder.name}
                                      onChange={e => props.updateName(folder.id, e.target.value)}/>

                            <div className="card-footer">
                                <div className="placeholder"></div>
                                <div className="index-container">
                                    <button type="button" className="card-btn" title="Decrease folder position"
                                            onClick={() => props.decreaseIndex(folder.id)}>
                                        <img src={minusIcon} alt="Minus icon"/>
                                    </button>
                                    <input type="number" required={true} className="index-number-input"
                                           value={folder.position}
                                           onChange={e => props.updatePosition(folder.id, e.target.value)}
                                           onKeyDown={e => props.moveFolder(folder.id, e.target.value, e)}
                                    />
                                    <button type="button" className="card-btn" title="Increase folder position"
                                            onClick={() => props.increaseIndex(folder.id)}>
                                        <img src={plusIcon} alt="Plus icon"/>
                                    </button>
                                </div>
                                <button type="button" className="card-btn" title="Delete this folder"
                                        onClick={() => props.removeFolder(folder.id)}>
                                    <img src={deleteIcon} alt="Delete icon"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewFolderModal;