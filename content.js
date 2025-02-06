chrome.storage.local.get("productData", function (result) {
    if (!result || !result.productData) {
        console.error("❌ Error: No product data found in storage.");
        return;
    }

    let product = result.productData;
    console.log("✅ Product Data Retrieved:", product);

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
        
        // Find the input field using the extracted ID
        const inputField = document.querySelector(`#${inputId}`);
        
        if (inputField) {
            inputField.click();  // Click on the input field
            inputField.value = product.title;  // Set the value of the input field
            console.log("✅ Title filled successfully!");
        } else {
            console.log("❌ Input field not found");
        }
    });
});
