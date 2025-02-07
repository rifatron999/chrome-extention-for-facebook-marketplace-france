chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getActiveTabId") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (chrome.runtime.lastError) {
                console.error("❌ Chrome Runtime Error:", chrome.runtime.lastError);
                sendResponse({ tabId: null });
                return;
            }
            if (!tabs || tabs.length === 0) {
                console.error("❌ Error: No active tab found.");
                sendResponse({ tabId: null });
                return;
            }
            console.log("✅ Active Tab ID Retrieved:", tabs[0].id);
            sendResponse({ tabId: tabs[0].id });
        });
        return true; // ✅ Keeps the message channel open for async response
    }
});
