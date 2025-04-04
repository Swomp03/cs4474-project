import "./componentStyles/Home.css";

import DeckFolder from "./DeckFolder";
import { useEffect, useState } from "react";
import { loadData } from "../utils/localStorage";
import useToggle from "./hooks/useToggle.js";
import EditFoldersModal from "./EditFoldersModal.jsx";
import AddNewFolderModal from "./AddNewFolderModal.jsx";
import usePageTitle from "./hooks/setTitle.js";

import edit from "../assets/icons/edit.svg"
// import dashboardIcon from "../assets/icons/space_dashboard.svg"
import plusIcon from "../assets/icons/plus.svg"

const Home = () => {
    // const [folderName, setFolderName] = useState("");
    const [folders, setFolders] = useState([]);
    // const [isEditMode, setIsEditMode] = useState(false);
    // const [newPositions, setNewPositions] = useState({});
    
    const { state: editFolderModalVisible, toggle: toggleEditFolderModalVisibility } = useToggle();
    const { state: newFolderModalVisible, toggle: toggleNewFolderModalVisibility } = useToggle();

    usePageTitle("Home | Anki+");

    useEffect(() => {
        setFolders(loadData());
    }, []);

    /*const toggleEditMode = () => {
        if (isEditMode) {
            saveFolders(folders);
            setNewPositions({});
        }
        setIsEditMode(!isEditMode);
    };*/

    /*const handleNewPositionChange = (folderId, newPosition) => {
        setNewPositions((prev) => ({
            ...prev,
            [folderId]: newPosition,
        }));
    };*/

    /*const updateFolderPosition = (folderId, newPosition, event) => {
        // Only proceed if the Enter key is pressed
        if (event.key !== "Enter") {
            return;
        }

        // If the input is empty, do nothing
        if (newPosition === "") {
            return;
        }

        const newPositionNumber = parseInt(newPosition);

        // Validate the input
        if (isNaN(newPositionNumber)) {
            alert("Please enter a valid number.");
            return;
        }

        if (newPositionNumber < 1 || newPositionNumber > folders.length) {
            alert(`Position must be between 1 and ${folders.length}.`);
            return;
        }

        // Create a copy of the folders array
        const updatedFolders = [...folders];

        // Find the folder to move
        const folderToMove = updatedFolders.find((folder) => folder.id === folderId);

        if (!folderToMove) {
            alert("Folder not found.");
            return;
        }

        // Find the folder currently at the new position
        const folderAtNewPosition = updatedFolders.find(
            (folder) => folder.position === newPositionNumber
        );

        // Swap positions
        if (folderAtNewPosition) {
            const tempPosition = folderToMove.position;
            folderToMove.position = folderAtNewPosition.position;
            folderAtNewPosition.position = tempPosition;
        } else {
            // If no folder is at the new position, just move the folder
            folderToMove.position = newPositionNumber;
        }

        // Sort folders by position
        const reorderedFolders = updatedFolders.sort((a, b) => a.position - b.position);

        // Update the state with the new order of folders
        setFolders(reorderedFolders);

        // Clear the new position input for this folder
        setNewPositions((prev) => ({
            ...prev,
            [folderId]: "",
        }));
    };*/

    const updateFolders = (updatedFolders) => {
        setFolders(updatedFolders);
    };
    
    return (
        <>
            {editFolderModalVisible &&
                <EditFoldersModal toggleVisibility={toggleEditFolderModalVisibility} folders={folders} updateFolders={updateFolders} />}

            {newFolderModalVisible &&
                <AddNewFolderModal toggleVisibility={toggleNewFolderModalVisibility} folders={folders} updateFolders={updateFolders} />}

            <div className="home-header">
                {/*<button id="edit-layout-button" className="default-btn img-btn" title="Edit the folder layout"  onClick={toggleEditMode}>*/}
                {/*    <img src={dashboardIcon} alt="Dashboard icon" />*/}
                {/*    {isEditMode ? " Save Layout" : " Edit Layout"}*/}
                {/*</button>*/}
                <button id="edit-folder-button" className="default-btn img-btn" title="Edit the folder layout"
                        onClick={toggleEditFolderModalVisibility}>
                    <img src={edit} alt="Edit folder icon"/>
                    Edit Folders
                </button>

                <h1>Decks</h1>

                <button id="new-folder-button" className="default-btn img-btn" onClick={toggleNewFolderModalVisibility}>
                    <img src={plusIcon} alt="Plus icon"/>
                    New Folder
                </button>
            </div>

            <div className="deck-folders-container">
                <div className="deck-folders">
                    {folders.map((folder) => (
                        <div key={folder.id} className="deck-folder-group">
                            <DeckFolder key={folder.id} folder={folder} updateFolders={updateFolders} />

                            {/* Static position field (always visible) */}
                            {/*<div className="position-container">*/}
                            {/*    <span>Position: {folder.position}</span>*/}
                            {/*</div>*/}

                            {/* New position field (visible only in edit mode) */}
                            {/*{isEditMode && (*/}
                            {/*    <div className="new-position-container">*/}
                            {/*        <label>New Position:</label>*/}
                            {/*        <input*/}
                            {/*            type="number"*/}
                            {/*            min="1"*/}
                            {/*            max={folders.length}*/}
                            {/*            value={newPositions[folder.id] ?? ""}*/}
                            {/*            onChange={(e) =>*/}
                            {/*                handleNewPositionChange(folder.id, e.target.value)*/}
                            {/*            }*/}
                            {/*            onKeyDown={(e) =>*/}
                            {/*                updateFolderPosition(folder.id, e.target.value, e)*/}
                            {/*            }*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;