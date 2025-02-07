
// fetch
    document.addEventListener("DOMContentLoaded", async function () {
        try {
            let response = await fetch("http://localhost/others/chrome-extention-for-facebook-marketplace-france/fetchProducts.php");
            let products = await response.json();

            let tableBody = document.querySelector("#productTable tbody");
            tableBody.innerHTML = ""; // Clear previous data

            products.forEach(product => {
                let row = document.createElement("tr");
                
                row.innerHTML = 
                    `<td>
                        <input class="selectedRow" type="checkbox" value="${product.id}">
                    </td>
                    <td>
                        ${product.images && product.images.length > 0 ? 
                            `<img src="http://localhost/others/chrome-extention-for-facebook-marketplace-france/${product.images[0]}" width="50">` : 
                            "No Image"}
                    </td>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                    <td>${product.condition}</td>
                    <td>${product.status}</td>`;
                
                // Add event listener to the row
                row.addEventListener("click", function () {
                    // Trigger the listProduct button's click event with the product ID
                    let listProductButton = document.getElementById("listProduct");
                    listProductButton.value = product.id;  // Set the value of the button to the product ID
                    listProductButton.click();  // Trigger the button click event
                });
            
                tableBody.appendChild(row);
            });
            

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    });
//fetch end

//list product 
    document.getElementById("listProduct").addEventListener("click", function () {
        let selectedValues = Array.from(document.querySelectorAll(".selectedRow:checked"))
            .map(checkbox => checkbox.value);

        if (selectedValues.length === 0) {
            alert("⚠️ Please select at least one product.");
            return;
        }

        console.log("✅ Selected Product IDs:", selectedValues); // Debugging log
        
        selectedValues.forEach(productId => {
            fetch("http://localhost/others/chrome-extention-for-facebook-marketplace-france/server.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value: productId }) // Send one product at a time
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log("✅ Server Response for Product ID:", productId, data);

                if (data.error) {
                    console.error("❌ Server Error:", data.error);
                    return;
                }

                // Open a new Facebook Marketplace tab for each product
                chrome.tabs.create({ url: "https://www.facebook.com/marketplace/create/item" }, function (tab) {
                    
                    // Store each product data
                    chrome.storage.local.set({ productData: data }, function () {
                        console.log("📦 Product data saved for:", productId);

                        // Inject content script for each product
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            files: ["content.js"]
                        }).catch(err => {
                            console.error("❌ Error injecting content script:", err);
                        });
                    });
                });
            })
            .catch(error => console.error("❌ Fetch Error for Product ID:", productId, error));
        });
    });

//list end
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
            // ✅ Refresh the whole extension after successful upload
            //chrome.runtime.reload();
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to upload product.");
        }
    });
//upload end 
