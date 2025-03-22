import "./componentStyles/Home.css";
import DeckFolder from "./DeckFolder";
import { useEffect, useState } from "react";
import { loadData, addFolder, saveFolders } from "../utils/localStorage"; // Import saveFolders

const Home = () => {
    // State to track the folder name input
    const [folderName, setFolderName] = useState("");

    // State to store the list of folders
    const [folders, setFolders] = useState([]);

    // State to track whether the layout is in "edit mode"
    const [isEditMode, setIsEditMode] = useState(false);

    // State to store temporary input values for new positions
    const [newPositions, setNewPositions] = useState({});

    // Load folders from localStorage when the component mounts
    useEffect(() => {
        setFolders(loadData());
    }, []);

    // Function to handle form submission for adding a new folder
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!folderName.trim()) return;

        addFolder(folderName);
        setFolders(loadData());
        setFolderName("");
    };

    // Function to toggle edit mode
    const toggleEditMode = () => {
        if (isEditMode) {
            // Save the new order of folders when exiting edit mode
            saveFolders(folders);
            setNewPositions({}); // Clear the new positions state
        }
        setIsEditMode(!isEditMode);
    };

    // Function to handle changes in the new position input field
    const handleNewPositionChange = (folderId, newPosition) => {
        // Update the new positions state
        setNewPositions((prev) => ({
            ...prev,
            [folderId]: newPosition,
        }));
    };

    // Function to update the folder's position when the user presses Enter
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

        // Remove the folder from its current position
        const filteredFolders = updatedFolders.filter((folder) => folder.id !== folderId);

        // Insert the folder at the new position
        filteredFolders.splice(newPositionNumber - 1, 0, folderToMove);

        // Update the positions of all folders
        const reorderedFolders = filteredFolders.map((folder, index) => ({
            ...folder,
            position: index + 1, // Update the position property
        }));

        // Update the state with the new order of folders
        setFolders(reorderedFolders);

        // Clear the new position input for this folder
        setNewPositions((prev) => ({
            ...prev,
            [folderId]: "",
        }));
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
                <button id="new-folder-button">+ New Folder</button>
            </div>

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
                                    value={newPositions[folder.id] ?? ""} // Use newPositions if it exists, otherwise use an empty string
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