function getMeaning(word, sendResponse) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data[0]["meanings"]);
            let meaningsByType = {};

            data[0].meanings.forEach((meaning, _i1, _i2) => {
                console.log(meaning);
                meaningsByType[meaning["partOfSpeech"]] = meaning["definitions"][0]["definition"];
            })

            return meaningsByType;
        })
        .then(meaningsByType => sendResponse({
            meaningsByType: meaningsByType,
        }))
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const word = message.word;
    console.log(word);
    getMeaning(word, sendResponse);

    return true;
})