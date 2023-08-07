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
        let jobDescription = info.selectionText;
        chrome.tabs.sendMessage(tab.id, {
            message: "SEND_JOB_DESCRIPTION",
            jobDescription: jobDescription
        });
    }
});
```