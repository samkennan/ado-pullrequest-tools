var lastScrollHeight = -1;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'URL_CHANGED') onFilesPage()
});

function addHighlighting() {
    var tableRows = document.querySelector('.repos-file-explorer-tree tbody').children

    for (var i = 0; i < tableRows.length; i++) {
        var pill = tableRows[i].querySelector('.bolt-pill-content')

        if (pill !== null) {
            switch (pill.innerHTML) {
                case '+':
                    tableRows[i].classList.add("added-file")
                    break
                case '-':
                    tableRows[i].classList.add("removed-file")
                    break
                default:
                    tableRows[i].classList.add("modified-file")
                    break
            }
        }
        else {
            if (!tableRows[i].querySelector('.repos-folder-icon')) {
                tableRows[i].classList.add("modified-file")
            }
        }
    }

    chrome.runtime.sendMessage({code: "INJECT_CSS"})
}

function onFilesPage() {
    if (document.URL.includes("_a=files")) {
        addHighlighting()
        const targetNode = document.querySelectorAll('.repos-changes-explorer-tree-root')[0].parentElement
        targetNode.addEventListener('scroll', (e) => {
            if (lastScrollHeight != targetNode.scrollTop) {
                addHighlighting()
            }

            lastScrollHeight = targetNode.scrollTop
        }, { passive: true });
    }
}

onFilesPage()



