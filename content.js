chrome.runtime.sendMessage({ action: "getActiveTabId" }, function (response) {
    if (chrome.runtime.lastError) {
        console.error("❌ Chrome Runtime Error:", chrome.runtime.lastError.message);
        return;
    }

    if (!response || !response.tabId) {
        console.error("❌ Error: Could not retrieve active Tab ID.");
        return;
    }

    let tabId = response.tabId;
    console.log(`✅ Retrieved Tab ID: ${tabId}`);

    let storageKey = "productData_" + tabId;
    
    chrome.storage.local.get(storageKey, function (result) {
        if (chrome.runtime.lastError) {
            console.error("❌ Chrome Storage Error:", chrome.runtime.lastError);
            return;
        }

        if (!result || !result[storageKey]) {
            console.error(`❌ No product data found for Tab ID ${tabId}.`);
            return;
        }

        let product = result[storageKey];
        console.log(`✅ Product Data Retrieved for Tab ID ${tabId}:`, product);

        //from filling logic
        setTimeout(() => {
            function waitForElement(selector, callback, interval = 1000, maxAttempts = 10) {
                let attempts = 0;
                const check = setInterval(() => {
                    let element = document.querySelector(selector);
                    if (element) {
                        clearInterval(check);
                        callback(element);
                    } else {
                        console.log(`🔄 Waiting for form fields... (${++attempts}/${maxAttempts})`);
                        if (attempts >= maxAttempts) {
                            clearInterval(check);
                            console.error("❌ Error: Form fields not found.");
                        }
                    }
                }, interval);
            }

            // 📌 Drag & Drop Images into Facebook Upload Box
            function dropImages(imageUrls) {
                waitForElement('input[type="file"][accept*="image"]', async (fileInput) => {
                    console.log("✅ Found Image Upload Input!");

                    let dataTransfer = new DataTransfer();
                    for (let imageUrl of imageUrls) {
                        let response = await fetch(imageUrl);
                        let blob = await response.blob();
                        let file = new File([blob], "product-image.jpg", { type: blob.type });
                        dataTransfer.items.add(file);
                    }

                    fileInput.files = dataTransfer.files;
                    fileInput.dispatchEvent(new Event("change", { bubbles: true }));
                    console.log("✅ Images dropped successfully!");
                });
            }

            if (product.images && product.images.length > 0) {
                dropImages(product.images);
            } else {
                console.log("❌ No images found in product data.");
            }

            // Fill form fields (Title, Price, Description, etc.)
            function fillInputField(label, value) {
                waitForElement(`label[aria-label="${label}"]`, (labelElement) => {
                    const inputId = labelElement.getAttribute('for');
                    const escapedInputId = inputId.replace(/:/g, '\\:');
                    const inputField = document.querySelector(`#${escapedInputId}`);
                    if (inputField) {
                        inputField.focus();
                        setTimeout(() => {
                            inputField.value = value;
                            inputField.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
                            console.log(`✅ ${label} set successfully!`);
                        }, 100);
                    } else {
                        console.log(`❌ ${label} input field not found`);
                    }
                });
            }

            fillInputField("Title", product.title);
            fillInputField("Price", product.price);
            fillInputField("Description", product.description);

            // Set dropdown values (Category, Condition)
            function selectDropdown(label, optionText) {
                waitForElement(`label[aria-label="${label}"]`, (dropdown) => {
                    dropdown.click();
                    setTimeout(() => {
                        let newOption = [...document.querySelectorAll('span')]
                            .find(span => span.textContent.trim() === optionText);
                        if (newOption) {
                            newOption.click();
                            console.log(`✅ ${label} set to ${optionText}`);
                        } else {
                            console.error(`❌ '${label}' option not found`);
                        }
                    }, 1000);
                });
            }

            selectDropdown("Category", "Mobile phones");
            selectDropdown("Condition", "New");

        }, 5000);
        //from filling logic end 
    });
});
