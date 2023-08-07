```javascript
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": "highlightedText",
        "title": "Send to Job Application Helper",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "highlightedText") {
        chrome.tabs.sendMessage(tab.id, {
            message: "SEND_JOB_DESCRIPTION",
            jobDescription: info.selectionText
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "SEND_JOB_DESCRIPTION") {
        chrome.storage.local.set({jobDescription: request.jobDescription});
    }
});
```