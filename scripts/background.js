var tabId = -1
var addedFileColor = '#1ff75f'
var removedFileColor = '#ff2903'
var modifiedFileColor = '#a146ec'
var highlightColorOpacity = '20'

function updateValuesFromSettings() {
    chrome.storage.sync.get('addedHighlightColor', function (result) {
        if (result.addedHighlightColor != null) {
            addedFileColor = result.addedHighlightColor
        }
    });
    
    chrome.storage.sync.get('removedHighlightColor', function (result) {
        if (result.removedHighlightColor != null) {
            removedFileColor = result.removedHighlightColor
        }
    });
    
    chrome.storage.sync.get('modifiedHighlightColor', function (result) {
        if (result.modifiedHighlightColor != null) {
            modifiedFileColor = result.modifiedHighlightColor
        }
    });
    
    chrome.storage.sync.get('highlightColorOpacity', function (result) {
        if (result.highlightColorOpacity != null) {
            highlightColorOpacity = result.highlightColorOpacity
        }
    });
}

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
    tabId = _tabId
    if (changeInfo.url) {
        chrome.tabs.sendMessage(tabId, {
            message: 'URL_CHANGED',
            url: changeInfo.url
        });
    }
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.code == "INJECT_CSS" && tabId != -1) {
            updateValuesFromSettings()
            var hexOpacity = Number(highlightColorOpacity).toString(16).padStart(2, '0') // is this working correctly? 
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                css: `.added-file { background: ${addedFileColor + hexOpacity} !important; }\
                       .removed-file { background: ${removedFileColor + hexOpacity} !important; }\
                       .modified-file { background: ${modifiedFileColor + hexOpacity} !important; }`
            });
        }
    }
);