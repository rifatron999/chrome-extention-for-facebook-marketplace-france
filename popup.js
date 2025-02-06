document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove("tab-active"));
            this.classList.add("tab-active");

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove("tab-active"));

            // Show the active tab content
            const tabId = this.getAttribute("data-tab");
            document.getElementById(tabId).classList.add("tab-active");
        });
    });
});

// fetch
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
//upload
document.getElementById("productForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("category", document.getElementById("category").value);
    formData.append("condition", document.getElementById("condition").value);
    formData.append("status", document.getElementById("status").value);

    let imageFiles = document.getElementById("images").files;
    for (let i = 0; i < imageFiles.length; i++) {
        formData.append("images[]", imageFiles[i]);
    }

    try {
        let response = await fetch("http://localhost/others/chrome-extention-for-facebook-marketplace-france/upload.php", {
            method: "POST",
            body: formData
        });

        let text = await response.text(); // Get raw response
        console.log("Server Response:", text); // Debug response

        let result = JSON.parse(text); // Parse JSON after checking
        alert(result.message);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to upload product.");
    }
});


//upload end 
