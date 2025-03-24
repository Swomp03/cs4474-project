import "./componentStyles/Home.css";
import DeckFolder from "./DeckFolder";
import { useEffect, useState } from "react";
import { loadData, addFolder, saveFolders } from "../utils/localStorage";
import useToggle from "./hooks/useToggle.js";
import NewFolderModal from "./NewFolderModal.jsx";

const Home = () => {
    const [folderName, setFolderName] = useState("");
    const [folders, setFolders] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [newPositions, setNewPositions] = useState({});
    
    const { state: visible, toggle: toggleVisibility } = useToggle();
    

    useEffect(() => {
        setFolders(loadData());
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!folderName.trim()) return;

        addFolder(folderName);
        setFolders(loadData());
        setFolderName("");
    };

    const toggleEditMode = () => {
        if (isEditMode) {
            saveFolders(folders);
            setNewPositions({});
        }
        setIsEditMode(!isEditMode);
    };

    const handleNewPositionChange = (folderId, newPosition) => {
        setNewPositions((prev) => ({
            ...prev,
            [folderId]: newPosition,
        }));
    };

    const updateFolderPosition = (folderId, newPosition, event) => {
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
    };

    const updateFolders = (updatedFolders) => {
        setFolders(updatedFolders);
    };
    
    return (
        <>
            <div>
                <h2>Create a New Folder</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Folder Name"
                        value={folderName}
                        onChange={(event) => setFolderName(event.target.value)}
                    />
                    <button type="submit">Add Folder</button>
                </form>
            </div>

            <div className="home-header">
                <button id="edit-layout-button" onClick={toggleEditMode}>
                    {isEditMode ? "Save Layout" : "Edit Layout"}
                </button>
                <h1>Decks</h1>
                <button id="new-folder-button" onClick={toggleVisibility}>+ New Folder</button>
            </div>
            {visible && <NewFolderModal toggleVisibility={toggleVisibility} folders={folders} updateFolders={updateFolders}></NewFolderModal>}

            <div className="deck-folders">
                {folders.map((folder) => (
                    <div key={folder.id} className="deck-folder-group">
                        <DeckFolder key={folder.id} folder={folder}></DeckFolder>

                        {/* Static position field (always visible) */}
                        <div className="position-container">
                            <span>Position: {folder.position}</span>
                        </div>

                        {/* New position field (visible only in edit mode) */}
                        {isEditMode && (
                            <div className="new-position-container">
                                <label>New Position:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={folders.length}
                                    value={newPositions[folder.id] ?? ""}
                                    onChange={(e) =>
                                        handleNewPositionChange(folder.id, e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        updateFolderPosition(folder.id, e.target.value, e)
                                    }
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;