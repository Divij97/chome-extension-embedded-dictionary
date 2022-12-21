document.addEventListener('keydown' , function(e) {
    if (e.key !== 'm') {
        return;
    }

    const word = window.getSelection().toString();
    if (word.length > 0) {
        chrome.runtime.sendMessage({word: word}, function(response) {
            console.log(response);
            displayMeaningsInline(response);
        });
    }
});

function displayMeaningsInline(meaningInfo) {
    let word = meaningInfo.word;
    let meaningsByType = meaningInfo.meaningsByType;

    // create a scrollable component
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    
    const scrollable = document.createElement('div');
    scrollable.className = 'scrollable'
    let closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.className = 'close-button';
    
    scrollable.appendChild(closeButton);
    const text = document.createElement("p");
    text.style.fontSize = '10px';
    text.style.color = 'red';
    text.innerHTML = `Word: ${word}<br>`;

    for (let key in meaningsByType) {
        text.innerHTML += `${key}: ${meaningsByType[key]}<br>`;
    }
    
    scrollable.appendChild(text);
    closeButton.addEventListener('click', () => {
        scrollable.remove();
    });
    
    selection.removeAllRanges();
    range.insertNode(scrollable);
}
