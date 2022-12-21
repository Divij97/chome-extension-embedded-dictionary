function getMeaning(word, sendResponse) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();   
            }
            else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            let meaningsByType = {};
            let word = data[0].word
            data[0].meanings.forEach((meaning, _i1, _i2) => {
                console.log(meaning);
                meaningsByType[meaning["partOfSpeech"]] = meaning["definitions"][0]["definition"];
            })

            return {
                word: word,
                meaningsByType: meaningsByType
            }
        })
        .then(meaningInfo => sendResponse(meaningInfo))
        .catch(error => console.log(error));
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const word = message.word;
    getMeaning(word, sendResponse);

    return true;
})