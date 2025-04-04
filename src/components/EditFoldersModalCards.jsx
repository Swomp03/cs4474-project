import "./componentStyles/EditModalCards.css";

import deleteIcon from '../assets/icons/delete.svg';
import plusIcon from '../assets/icons/plus.svg';
import minusIcon from '../assets/icons/minus.svg';

export function EditFolderCard(props) {
    const folder = props.folder;

    function onInputFocusLost(target) {
        // Reset the input value once focus is lost (so there isn't 2 of the same positions shown)
        target.value = props.currIndex + 1;
    }

    function onKeyDown(event) {
        // Return early if the user didn't press the enter key
        if (event.key !== "Enter") {
            return;
        }

        // If the input target is not valid alert the user
        if (!event.target.checkValidity()) {
            event.target.reportValidity();
        } else { // Otherwise, move the card
            props.moveFolder(props.currIndex, event.target.value, event);
        }
    }

    return (
        <>
            <div className="small-card edit-card">
                <span className="text-header">Folder Name</span>
                <textarea required={true} name="name" placeholder="Enter folder name..." className="text-input"
                       value={folder.name}
                       onChange={e => props.updateName(folder.id, e.target.value)}/>

                <div className="card-footer">
                    <div className="placeholder"></div>
                    <div className="index-container">
                        <button type="button"
                                className={`card-btn ${props.currIndex === 0 ? 'disabled' : ''}`}
                                title="Decrease folder postion"
                                disabled={props.currIndex === 0}
                                onClick={e => props.decreaseIndex(props.currIndex, e)}>
                            <img src={minusIcon} alt="Minus icon"/>
                        </button>
                        <input type="number" required={true} className="index-number-input" value={folder.position}
                               min={1}
                               max={props.maxIndex}
                               form="n/a" // Prevent the input from submitting
                               onChange={e => props.updatePosition(props.currIndex, e.target.value)}
                               onKeyDown={e => onKeyDown(e)}
                               onBlur={e => onInputFocusLost(e.target)}
                        />
                        <button type="button"
                                className={`card-btn ${props.currIndex === props.maxIndex - 1 ? 'disabled' : ''}`}
                                title="Increase folder postion"
                                disabled={props.currIndex === props.maxIndex - 1}
                                onClick={e => props.increaseIndex(props.currIndex, e)}>
                            <img src={plusIcon} alt="Plus icon"/>
                        </button>
                    </div>
                    <button type="button" className="card-btn" title="Delete this folder"
                            onClick={() => props.removeFolder(props.currIndex)}>
                        <img src={deleteIcon} alt="Delete icon"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export function NewFolderCard(props) {
    return (
        <>
            <div className="small-card edit-card">
                <span className="text-header">Folder Name</span>
                <textarea required={true} name="name" placeholder="Enter folder name..." className="text-input"
                          value={props.folderName}
                          onChange={e => props.setFolderName(e.target.value)}/>
            </div>
        </>
    )
}

export function AddFolderCard(props) {
    return (
        <>
            <button type="button" id="new-card" className="small-card" onClick={() => props.addFolder()}>
                <img src={plusIcon} alt="Plus icon"/>
                <span>New Folder</span>
            </button>
        </>
    )
}