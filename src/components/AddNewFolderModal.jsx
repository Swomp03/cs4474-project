import "./componentStyles/EditModal.css";

import {loadData, addFolder} from "../utils/localStorage.js";
import {NewFolderCard} from "./EditFoldersModalCards.jsx";
import {useState} from "react";

import cancel from "../assets/icons/cancel.svg";
import plus from "../assets/icons/plus.svg";


const AddNewFolderModal = (props) => {
    const [folderName, setFolderName] = useState("");

    const cancelEdits = () => {
        const cancel = confirm(`Are you sure you want to cancel? Any changes will be lost.`);
        if (cancel)
            props.toggleVisibility();
    }

    const saveEdits = (event) => {
        event.preventDefault();

        addFolder(folderName);

        props.updateFolders(loadData()); // Push the changes to the Home page
        props.toggleVisibility();
    }

    return (
        <div id="modal-root" className="static">
            <div id="modal-background" onClick={() => cancelEdits()}></div>

            <div id="modal-container">
                <div id="modal-body">
                    <div id="modal-header">
                        <button type="button" className={"header-btn modal-btn default-btn img-btn"}
                                onClick={() => cancelEdits()}>
                            <img src={cancel} alt="Cancel icon"/>
                            Cancel
                        </button>
                        <h1>Add Folder</h1>
                        <button type="submit" className={"header-btn primary-btn img-btn"} form="folders-container">
                            <img src={plus} alt="Plus icon"/>
                            Add
                        </button>
                    </div>

                    <form id="folders-container" className="group-container" onSubmit={saveEdits}>
                        <NewFolderCard folderName={folderName} setFolderName={setFolderName}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewFolderModal;