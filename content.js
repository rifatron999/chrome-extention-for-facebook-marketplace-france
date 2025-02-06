chrome.storage.local.get("productData", function (result) {
    if (!result || !result.productData) {
        console.error("❌ Error: No product data found in storage.");
        return;
    }

    let product = result.productData;
    console.log("✅ Product Data Retrieved:", product);

    // Wait for 10 seconds before executing the script
    setTimeout(() => {
        function waitForElement(selector, callback, interval = 500, maxAttempts = 20) {
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
                    
                    console.log("✅ Title filled and focused successfully!");
                }, 100);  // Wait for 100ms to ensure focus happens before setting value
            } else {
                console.log("❌ Input field not found");
            }
        });
        
        

    }, 10000);  // Delay execution by 10 seconds (10000 ms)
});
