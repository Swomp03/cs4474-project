import { addFolder } from "../utils/localStorage";
import "./componentStyles/Home.css"
import DeckFolder from "./DeckFolder"
import { useState } from "react";

const Home = () =>{

    const folders = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    // const folders = [];
    const folderName = '';
    

    function newFolder(folderName){
        console.log("New folder clicked");
        addFolder(folderName);
    }

    function test(){
        console.log('test');
    }


    return(
        <>
            {/* <div>
                <form action={test()}>
                    <label>Enter Folder Name:</label>
                    <input type="text" value={folderName} onChange={test()}/>
                    <button type="submit">Add Folder</button>
                </form>
            </div> */}

            <div className="home-header">
                <button id="edit-layout-button">Edit Layout</button>
                <h1>Decks</h1>
                <button id="new-folder-button">+ New Folder</button>
            </div>

            <div className="deck-folders">
                {folders.map((folder) => (
                    <div key={folder} className="deck-folder-group">
                        <DeckFolder></DeckFolder>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home