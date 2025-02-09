class DictionaryService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Method to get a definition by word (returns JSON)
    getDefinition(word) {
        return fetch(`${this.baseUrl}/api/definitions?word=${word}`)
            .then(response => response.json()); 
    }

    // Method to store a word and its definition (returns plain text)
    storeWord(word, definition) {
        const data = { word, definition };
        return fetch(`${this.baseUrl}/api/definitions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 409) {
                return response.text();
            }
            return response.text(); 
        });
    }
}

export default DictionaryService;
