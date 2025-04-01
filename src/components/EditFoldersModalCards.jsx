import "./componentStyles/EditModalCards.css";

import deleteIcon from '../assets/icons/delete.svg';
import plusIcon from '../assets/icons/plus.svg';
import minusIcon from '../assets/icons/minus.svg';

export function EditFolder(props) {
    const folder = props.folder;

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
                        <button type="button" className="card-btn" title="Decrease folder position"
                                onClick={() => props.decreaseIndex(folder.id)}>
                            <img src={minusIcon} alt="Minus icon"/>
                        </button>
                        <input type="number" required={true} className="index-number-input" value={folder.position}
                               onChange={e => props.updatePosition(folder.id, e.target.value)}
                               onKeyDown={e => props.moveFolder(folder.id, e.target.value, e)}
                        />
                        <button type="button" className="card-btn" title="Increase folder position"
                                onClick={() => props.increaseIndex(folder.id)}>
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