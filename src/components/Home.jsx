import "./componentStyles/Home.css"
import DeckFolder from "./DeckFolder"
import { useEffect, useState } from "react";
import { loadData, addFolder } from "../utils/localStorage";

const Home = () =>{

    // const folders = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    // const folders = [];

    const [folderName, setFolderName] = useState("");
    const [folders, setFolders] = useState([]);

    function newFolder(folderName){
        console.log("New folder clicked");
        addFolder(folderName);
    }

    function test(){
        console.log('test');
    }

    useEffect(() => {
        setFolders(loadData());
    }, []);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!folderName.trim()) return;

        addFolder(folderName);
        setFolders(loadData());
        setFolderName("");
    }


    return(
        <>
            <div>
                <h2>Create a New Folder</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter Folder Name" value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
                    <button type="submit">Add Folder</button>
                </form>
            </div>

            <div className="home-header">
                <button id="edit-layout-button">Edit Layout</button>
                <h1>Decks</h1>
                <button id="new-folder-button" onClick={test}>+ New Folder</button>
            </div>

            <div className="deck-folders">
                {folders.map((folder) => (
                    <div key={folder.id} className="deck-folder-group">
                        <DeckFolder key={folder.id} folder={folder}></DeckFolder>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home