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

// Adding a folder
export const addFolder = (name) => {
    const data = loadData();
    const newFolder = { id: Date.now().toString(), name, decks: [] };
    data.push(newFolder);
    saveData(data);
};

// Add a deck to a folder
export const addDeck = (folderId, deckName, deckDescription) => {
    const data = loadData();
    const folder = data.find(f => f.id === folderId);
    if(folder) {
        folder.decks.push({ id: Date.now().toString(), name: deckName, description: deckDescription, cards: [] });
        saveData(data);
    }
};


// Add a card to a deck
export const addCard = (folderId, deckId, question, answer) => {
    const data = loadData();
    const folder = data.find(f => f.id === folderId);
    if(folder){
        const deck = folder.decks.find(d => d.id === deckId);
        if(deck){
            deck.cards.push({ question, answer});
            saveData(data);
        }
    }
}

export const saveCards = (folderId, deckId, cards) => {
    const data = loadData();
    const folder = data.find(f => f.id === folderId);

    if(folder){
        const deck = folder.decks.find(d => d.id === deckId);
        if(deck){
            // TODO: Add warning about empty cards?
            deck.cards = cards;
            saveData(data);
        }
    }
}

