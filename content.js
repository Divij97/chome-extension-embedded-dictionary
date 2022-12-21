document.addEventListener('keydown' , function(e) {
    if (e.key !== 'm') {
        return;
    }

    const word = window.getSelection().toString();
    if (word.length > 0) {
        chrome.runtime.sendMessage({word: word}, function(response) {
            console.log(response);
            displayMeaningsInline(response.meaningsByType);
        });
    }
});

function displayMeaningsInline(meaningsByType) {
    // create a scrollable component
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    
    const scrollable = document.createElement('div');
    scrollable.className = 'scrollable'
    let closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.className = 'close-button';
    scrollable.appendChild(closeButton);

    // add points
    for (let key in meaningsByType) {
        const point = document.createElement("p");
        point.innerText = `${key}: ${meaningsByType[key]}`;
        point.style.fontSize = '10px';
        point.style.color = 'red';
        scrollable.appendChild(point);
    }

    closeButton.addEventListener('click', () => {
        scrollable.remove();
      });
    
    selection.removeAllRanges();
    range.insertNode(scrollable);
}
