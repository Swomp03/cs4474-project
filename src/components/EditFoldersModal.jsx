import "./componentStyles/EditModal.css";

import {saveFolders, createNewFolder, loadData} from "../utils/localStorage.js";
import {EditFolderCard, AddFolderCard} from "./EditFoldersModalCards.jsx";
import {useState} from "react";

import cancel from "../assets/icons/cancel.svg";
import save from "../assets/icons/save.svg";


const EditFoldersModal = (props) => {
    // Must call loadData and not pass props.folders to prevent references causing side effects in the UI
    const [folders, setFolders] = useState(loadData());

    const addNewFolder = () => {
        // Create a new folder at the end of the other folders, with the default blank placeholder text
        const newFolder = createNewFolder();
        setFolders([...folders, newFolder]);
    }

    const removeFolder = (index) => {
        if (index < 0 || index >= folders.length) {
            console.log(`Index out of range (must be between 0 and ${folders.length - 1})`);
            return;
        }

        console.log("Removing folder at", index);

        const adjustedFolders = [...folders];
        adjustedFolders.splice(index, 1); // Delete folder at index

        // Fix the indexes
        for (let i = 0; i < adjustedFolders.length; i++) {
            adjustedFolders[i].position = i + 1;
        }

        setFolders(adjustedFolders);
    }

    const increaseIndex = (currIndex, event) => {
        if (currIndex >= folders.length - 1) {
            console.log("Can't increase index, at bound");
            return;
        }

        event.currentTarget.blur(); // Remove focus

        const newFolders = [...folders]; // Make a copy of the array

        const targetFolder = newFolders[currIndex + 1];

        newFolders[currIndex + 1] = newFolders[currIndex];
        newFolders[currIndex + 1].position = currIndex + 2;

        targetFolder.position = currIndex + 1;
        newFolders[currIndex] = targetFolder;

        setFolders(newFolders);
    }

    const decreaseIndex = (currIndex, event) => {
        if (currIndex <= 0) {
            console.log("Can't decrease index, at bound");
            return;
        }

        event.currentTarget.blur(); // Remove focus

        const newFolders = [...folders]; // Make a copy of the array

        const targetFolder = newFolders[currIndex - 1];

        newFolders[currIndex - 1] = newFolders[currIndex]; // Decrease the moving folder's index by 1
        newFolders[currIndex - 1].position = currIndex;

        targetFolder.position = currIndex + 1;
        newFolders[currIndex] = targetFolder;

        setFolders(newFolders);
    }

    const updatePosition = (currIndex, newPositionString) => {
        const newPosition = parseInt(newPositionString); // Caveat: This can result in NaN if "" but this is intentional

        // Log a warning but allow out of range values (the HTML validation will handle it)
        if (newPosition < 0 || newPosition > folders.length) {
            console.log(`Position ${newPosition} out of range (must be between 1 and ${folders.length})`);
        }

        const newFolders = [...folders]; // Make a copy of the array
        newFolders[currIndex].position = newPosition;
        setFolders(newFolders);
    }

    const moveFolder = (currIndex, newPositionString, event) => {
        if (newPositionString === "") return;

        const newIndex = parseInt(newPositionString) - 1;

        if (isNaN(newIndex)) {
            console.log("Index is not a number");
            return;
        }

        console.log("Moving folder from index", currIndex, "to", newIndex);

        if (newIndex < 0 || newIndex > folders.length - 1) {
            console.log(`Index ${newIndex} out of range (must be between 0 and ${folders.length - 1})`);
        } else {
            const adjustedFolders = [...folders];

            const movingFolder = adjustedFolders.splice(currIndex, 1)[0]; // Remove original folder
            adjustedFolders.splice(newIndex, 0, movingFolder); // Insert the moving folder

            // Fix all the positions
            for (let i = 0; i < adjustedFolders.length; i++) {
                adjustedFolders[i].position = i + 1;
            }

            setFolders(adjustedFolders);
            event.target.blur(); // Remove focus
        }
    }

    const updateName = (folderId, newName) => {
        setFolders(folders.map(folder =>
            folder.id === folderId ? {...folder, name: newName} : folder
        ));
    }

    const cancelEdits = () => {
        const cancel = confirm(`Are you sure you want to cancel? Your changes will be lost`);
        if (cancel)
            props.toggleVisibility();
    }

    const saveEdits = (event) => {
        event.preventDefault();

        saveFolders(folders);
        props.updateFolders(folders); // Push the local changes to the Home page
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
                        <h1>Edit Folders</h1>
                        <button type="submit" className={"header-btn primary-btn img-btn"} form="folders-container">
                            <img src={save} alt="Save icon"/>
                            Save
                        </button>
                    </div>

                    <form id="folders-container" className="group-container" onSubmit={saveEdits}>
                        {folders.map((folder, index) => (
                            <EditFolderCard key={index} folder={folder} currIndex={index} maxIndex={folders.length}
                                            updateName={updateName} increaseIndex={increaseIndex}
                                            decreaseIndex={decreaseIndex} moveFolder={moveFolder}
                                            updatePosition={updatePosition} removeFolder={removeFolder}/>
                        ))}
                        <AddFolderCard addFolder={addNewFolder}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditFoldersModal;