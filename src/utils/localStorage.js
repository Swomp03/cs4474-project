const KEY = "flashcards"

// Saving data to local storage
export const saveData = (data) => {
    localStorage.setItem(KEY, JSON.stringify(data));
};

// Load data from local storage
export const loadData = () => {
    const storedData = localStorage.getItem(KEY);
    return storedData ? JSON.parse(storedData) : [];
};

// Create a new folder and return it
export const createNewFolder = (name = "") => {
    const data = loadData();
    const lastFolder = data[data.length - 1]; // Get the last folder in the list

    const newPosition = lastFolder ? lastFolder.position + 1 : 1; // Set position to last folder's position + 1 (or 1 if no folders exist)
    return {id: Date.now().toString(), name, decks: [], position: newPosition};
};

// Adding a folder
export const addFolder = (name = "") => {
    const data = loadData();
    const lastFolder = data[data.length - 1]; // Get the last folder in the list

    const newPosition = lastFolder ? lastFolder.position + 1 : 1; // Set position to last folder's position + 1 (or 1 if no folders exist)
    const newFolder = {id: Date.now().toString(), name, decks: [], position: newPosition};
    data.push(newFolder);
    saveData(data);
};

// Save the updated order of folders
export const saveFolders = (folders) => {
    saveData(folders);
};

// Add a deck to a folder
export const addDeck = (folderId, deckName, deckDescription) => {
    const data = loadData();
    const folder = data.find(f => f.id === folderId);
    if (folder) {
        folder.decks.push({id: Date.now().toString(), name: deckName, description: deckDescription, cards: []});
        saveData(data);
    }
};

// Create a new card and return it
export const createNewCard = (position, question = "", answer = "") => {
    const newCard = {
        "position": position,
        "question": question,
        "answer": answer
    };
    return newCard;
};

// Add a card to a deck
export const addCard = (folderId, deckId, question, answer) => {
    const data = loadData();
    const folder = data.find(f => f.id === folderId);
    if (folder) {
        const deck = folder.decks.find(d => d.id === deckId);
        if (deck) {
            deck.cards.push({question, answer});
            saveData(data);
        }
    }
};

// Add all cards to a deck
export const saveCards = (folderId, deckId, cards) => {
    const data = loadData();
    const folder = data.find(f => f.id === folderId);

    if (folder) {
        const deck = folder.decks.find(d => d.id === deckId);
        if (deck) {
            // TODO: Add warning about empty cards?
            deck.cards = cards;
            saveData(data);
        }
    }
};