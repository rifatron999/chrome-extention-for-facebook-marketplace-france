chrome.storage.local.get("productData", function (result) {
    if (!result || !result.productData) {
        console.error("❌ Error: No product data found in storage.");
        return;
    }

    let product = result.productData;
    console.log("✅ Product Data Retrieved:", product);

    // Wait for 10 seconds before executing the script
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
        //images
        
            // 📌 Drag & Drop Images into Facebook Upload Box
            function dropImages(imageUrls) {
                waitForElement('input[type="file"][accept*="image"]', async (fileInput) => {
                    console.log("✅ Found Image Upload Input!");

                    // Creating a DataTransfer object for drag-and-drop
                    let dataTransfer = new DataTransfer();

                    // Loop through image URLs and convert them to File objects
                    for (let imageUrl of imageUrls) {
                        let response = await fetch(imageUrl);
                        let blob = await response.blob();
                        let file = new File([blob], "product-image.jpg", { type: blob.type });

                        dataTransfer.items.add(file);
                    }

                    // Assign images to the file input
                    fileInput.files = dataTransfer.files;

                    // Dispatch change event to trigger upload
                    fileInput.dispatchEvent(new Event("change", { bubbles: true }));

                    console.log("✅ Images dropped successfully!");
                });
            }

            // 📌 Call the function with images from storage
            if (product.images && product.images.length > 0) {
                dropImages(product.images);
            } else {
                console.log("❌ No images found in product data.");
            }
        
        //images end

        //title
            waitForElement('label[aria-label="Title"]', (labelElement) => {
                // Extract the value of the 'for' attribute
                const inputId = labelElement.getAttribute('for');
                
                // Escape the colon in the inputId to make it a valid selector
                const escapedInputId = inputId.replace(/:/g, '\\:');
                
                // Find the input field using the escaped ID
                const inputField = document.querySelector(`#${escapedInputId}`);
                
                if (inputField) {
                    inputField.focus();  // Focus on the input field
                    
                    // Use setTimeout to ensure value is set after focus
                    setTimeout(() => {
                        inputField.value = product.title;  // Set the value of the input field
                        
                        // Trigger input event to notify the browser that the value has changed
                        const event = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        });
                        inputField.dispatchEvent(event);
                        
                        console.log("✅ Title focused and filled successfully!");
                    }, 100);  // Wait for 100ms to ensure focus happens before setting value
                } else {
                    console.log("❌ Input field not found");
                }
            });
        //title end 
        //price
            waitForElement('label[aria-label="Price"]', (labelElement) => {
                // Extract the value of the 'for' attribute
                const inputId = labelElement.getAttribute('for');
                
                // Escape the colon in the inputId to make it a valid selector
                const escapedInputId = inputId.replace(/:/g, '\\:');
                
                // Find the input field using the escaped ID
                const inputField = document.querySelector(`#${escapedInputId}`);
                
                if (inputField) {
                    inputField.focus();  // Focus on the input field
                    
                    // Use setTimeout to ensure value is set after focus
                    setTimeout(() => {
                        inputField.value = product.price;  // Set the value of the input field
                        
                        // Trigger input event to notify the browser that the value has changed
                        const event = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        });
                        inputField.dispatchEvent(event);
                        
                        console.log("✅ Price focused and filled successfully!");
                    }, 100);  // Wait for 100ms to ensure focus happens before setting value
                } else {
                    console.log("❌ Input field not found");
                }
            });
        //price end 

        //category
            waitForElement('label[aria-label="Category"]', (dropdown) => {
                dropdown.click(); // Click to open the dropdown
            
                setTimeout(() => {
                    let newOption = [...document.querySelectorAll('span')]
                        .find(span => span.textContent.trim() === product.category);
            
                    if (newOption) {
                        newOption.click();
                        console.log("✅ Category set");
                    } else {
                        console.error("❌ 'Category' option not found");
                    }
                }, 1000); // Delay to allow dropdown options to load
            });
        //category end

        //conditionf
            waitForElement('label[aria-label="Condition"]', (dropdown) => {
                dropdown.click(); // Click to open the dropdown
            
                setTimeout(() => {

                    let newOption = [...document.querySelectorAll('span')]
                        .find(span => span.textContent.trim() === product.conditionf);
            
                    if (newOption) {
                        newOption.click();
                        console.log("✅ conditionf set");
                    } else {
                        console.error("❌ 'conditionf' option not found");
                    }
                }, 1000); // Delay to allow dropdown options to load
            });
        //conditionf end
        
        //description
            waitForElement('label[aria-label="Description"]', (labelElement) => {
                // Extract the value of the 'for' attribute
                const inputId = labelElement.getAttribute('for');
                
                // Escape the colon in the inputId to make it a valid selector
                const escapedInputId = inputId.replace(/:/g, '\\:');
                
                // Find the input field using the escaped ID
                const inputField = document.querySelector(`#${escapedInputId}`);
                
                if (inputField) {
                    inputField.focus();  // Focus on the input field
                    
                    // Use setTimeout to ensure value is set after focus
                    setTimeout(() => {
                        inputField.value = product.description;  // Set the value of the input field
                        
                        // Trigger input event to notify the browser that the value has changed
                        const event = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        });
                        inputField.dispatchEvent(event);
                        
                        console.log("✅ Description focused and filled successfully!");
                    }, 100);  // Wait for 100ms to ensure focus happens before setting value
                } else {
                    console.log("❌ Input field not found");
                }
            });
        //description end
        
        //next
        setTimeout(() => {
            // Wait for the "Next" button and click it
            waitForElement('div[aria-label="Next"]', (nextButton) => {
                console.log("✅ 'Next' button found!");
                
                // Simulate a click on the "Next" button
                nextButton.click();

                console.log("🚀 Clicked 'Next' button!");
            }, 1000, 15);  // Retry every 1 second for up to 15 attempts
        }, 5000);
        //next #
        //publish
        setTimeout(() => {
            // Wait for the "Next" button and click it
            waitForElement('div[aria-label="Publish"]', (publishButton) => {
                console.log("✅ 'Publish' button found!");
                
                // Simulate a click on the "Next" button
                publishButton.click();

                console.log("🚀 Clicked 'Publish' button!");
            }, 1000, 15);  // Retry every 1 second for up to 15 attempts
        }, 6000);
        //publish #
        //update
        fetch("http://localhost/others/chrome-extention-for-facebook-marketplace-france/update.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: product.id }) // Replace 123 with the actual product ID
        })
        .then(response => response.json())
        .then(data => console.log("✅ Success:", data))
        .catch(error => console.error("❌ Error:", error));            
        //update end 
        
        

    }, 3000);  // Delay execution by 10 seconds (10000 ms)
});
