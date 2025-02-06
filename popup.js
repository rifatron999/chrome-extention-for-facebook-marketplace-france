document.getElementById("fetchProduct").addEventListener("click", function () {
    fetch("http://localhost/others/chrome-extention-for-facebook-marketplace-france/server.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data);

            // Open the Facebook Marketplace page
            chrome.tabs.create({ url: "https://www.facebook.com/marketplace/create/item" }, function (tab) {
                
                // Store the product data first
                chrome.storage.local.set({ productData: data }, function () {
                    console.log("Product data saved in storage.");

                    // Inject content script only after data is stored
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ["content.js"]
                    }).catch(err => {
                        console.error("Error injecting content script:", err);
                    });
                });
            });
        })
        .catch(error => console.error("Fetch Error:", error));
});
