// Known Issues: 
// - Cancelling after adding news folders is very jank (next time you add folder, it will add all the cancelled folders too)



import "./componentStyles/NewFolderModal.css";
import { saveFolders, addFolder, loadData } from "../utils/localStorage.js";
import { EditFolder, AddFolderCard } from "./EditFolders.jsx";
import { useEffect, useState } from "react";


const NewFolderModal = (props) => {
    const [folders, setFolders] = useState(props.folders);

    useEffect(() => {
        const container = document.getElementById("folders-container");
        if (!container) return;

        const folderElements = container.children;
        if (folderElements.length === 1) return;

        [...folderElements].forEach(folder => {
            if (folder instanceof HTMLButtonElement) return;

            const indexControls = folder.lastChild.children[1];
            if (indexControls.firstChild.classList?.contains("disabled")) {
                indexControls.firstChild.classList.remove("disabled");
                indexControls.firstChild.disabled = false;
            }

            if (indexControls.lastChild.classList?.contains("disabled")) {
                indexControls.lastChild.classList.remove("disabled");
                indexControls.lastChild.disabled = false;
            }
        });

        folderElements[0].lastChild.children[1].firstChild.classList.add("disabled");
        folderElements[0].lastChild.children[1].firstChild.disabled = true;
        folderElements[folderElements.length - 2].lastChild.children[1].lastChild.classList.add("disabled");
        folderElements[folderElements.length - 2].lastChild.children[1].lastChild.disabled = true;
    }, [folders]);

    const addNewFolder = () => {
        const newFolderName = "New Folder"; // Default name for new folders
        addFolder(newFolderName);
        setFolders(loadData());
    }

    const removeFolder = (index) => {
        if (index < 0 || index >= folders.length) {
            console.log(`Index out of range (must be between 0 and ${folders.length - 1})`);
            return;
        }

        const adjustedFolders = [...folders];
        adjustedFolders.splice(index, 1);

        for (let i = 0; i < adjustedFolders.length; i++) {
            adjustedFolders[i].position = i + 1;
        }

        setFolders(adjustedFolders);
    }

    const updateName = (folderId, newName) => {
        setFolders(folders.map(folder => 
            folder.id === folderId ? { ...folder, name: newName } : folder
        ));
    }

    const saveEdits = (event) => {
        event.preventDefault();
        saveFolders(folders);
        props.updateFolders(folders);
        props.toggleVisibility();
    }

    return (
        <div id="modal-root" className="static">
            <div id="modal-background" onClick={() => props.toggleVisibility()}></div>

            <div id="modal-container">
                <div id="modal-body">
                    <div id="modal-header">
                        <button type="button" className={"header-btn"} onClick={() => props.toggleVisibility()}>Cancel</button>
                        <h1>Edit Folders</h1>
                        <button type="submit" className={"header-btn save-btn"} form="folders-container">Save</button>
                    </div>

                    <form id="folders-container" onSubmit={saveEdits}>
                        {folders.map((folder, index) => (
                            <EditFolder key={index} folder={folder} updateName={updateName} removeFolder={() => removeFolder(index)} />
                        ))}
                        <AddFolderCard addFolder={addNewFolder} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewFolderModal;