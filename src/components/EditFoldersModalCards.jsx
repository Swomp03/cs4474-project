import "./componentStyles/EditModalCards.css";

import deleteIcon from '../assets/icons/delete.svg';
import plusIcon from '../assets/icons/plus.svg';
import minusIcon from '../assets/icons/minus.svg';

export function EditFolder(props) {
    const folder = props.folder;

    function onInputFocusLost(target) {
        // If the input target is not valid alert the user
        if (!target.checkValidity()) {
            target.reportValidity();
        } else { // Otherwise, reset the input value once focus is lost (so there isn't 2 of the same positions shown
            target.value = folder.index + 1;
        }
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
            props.moveFolder(folder.id, event.target.value, event)
        }
    }

    return (
        <>
            <div className="card edit-card">
                <span className="text-header">Folder Name</span>
                <textarea required={true} name="name" placeholder="Folder Name..." className="text-input"
                       value={folder.name}
                       onChange={e => props.updateName(folder.id, e.target.value)}/>

                <div className="card-footer">
                    <div className="placeholder"></div>
                    <div className="index-container">
                        <button type="button"
                                className={`card-btn ${folder.index === 0 ? 'disabled' : ''}`}
                                title="Decrease folder postion"
                                disabled={folder.index === 0}
                                onClick={() => props.decreaseIndex(folder.index)}>
                            <img src={minusIcon} alt="Minus icon"/>
                        </button>
                        <input type="number" required={true} className="index-number-input" value={folder.position}
                               min={1}
                               max={props.maxIndex}
                               onChange={e => props.updatePosition(folder.id, e.target.value)}
                               onKeyDown={e => onKeyDown(e)}
                               onBlur={e => onInputFocusLost(e.target)}
                        />
                        <button type="button"
                                className={`card-btn ${folder.index === props.maxIndex - 1 ? 'disabled' : ''}`}
                                title="Increase folder postion"
                                disabled={folder.index === props.maxIndex - 1}
                                onClick={() => props.increaseIndex(folder.index)}>
                            <img src={plusIcon} alt="Plus icon"/>
                        </button>
                    </div>
                    <button type="button" className="card-btn" title="Delete this folder"
                            onClick={() => props.removeFolder(folder.id)}>
                        <img src={deleteIcon} alt="Delete icon"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export function AddFolderCard(props) {
    return (
        <>
            <button type="button" id="new-card" className="card" onClick={() => props.addFolder()}>
                <img src={plusIcon} alt="Plus icon"/>
                <span>New Folder</span>
            </button>
        </>
    )
}