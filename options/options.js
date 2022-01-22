/* ----- GET SETTINGS ----- */

chrome.storage.sync.get('addedHighlightColor', function (result) {
    if (result.addedHighlightColor != null) {
        document.querySelector("#added-file-color").value = result.addedHighlightColor
    }
});

chrome.storage.sync.get('removedHighlightColor', function (result) {
    if (result.removedHighlightColor != null) {
        document.querySelector("#removed-file-color").value = result.removedHighlightColor
    }
});

chrome.storage.sync.get('modifiedHighlightColor', function (result) {
    if (result.modifiedHighlightColor != null) {
        document.querySelector("#modified-file-color").value = result.modifiedHighlightColor
    }
});

chrome.storage.sync.get('highlightColorOpacity', function (result) {
    if (result.highlightColorOpacity != null) {
        document.querySelector("#opacity-slider").value = result.highlightColorOpacity
    }
});

/* ----- UPDATE SETTINGS ----- */

var addedFileColor = document.querySelector("#added-file-color")
var removedFileColor = document.querySelector("#removed-file-color")
var modifiedFileColor = document.querySelector("#modified-file-color")
var highlightColorOpacity = document.querySelector("#opacity-slider")

addedFileColor.addEventListener('change', function () {
    chrome.storage.sync.set({'addedHighlightColor': this.value});
    chrome.runtime.sendMessage({code: "INJECT_CSS"})
});

removedFileColor.addEventListener('change', function () {
    chrome.storage.sync.set({'removedHighlightColor': this.value});
    chrome.runtime.sendMessage({code: "INJECT_CSS"})
});

modifiedFileColor.addEventListener('change', function () {
    chrome.storage.sync.set({'modifiedHighlightColor': this.value});
    chrome.runtime.sendMessage({code: "INJECT_CSS"})
});

highlightColorOpacity.addEventListener('change', function () {
    chrome.storage.sync.set({'highlightColorOpacity': this.value});
    chrome.runtime.sendMessage({code: "INJECT_CSS"})
});

