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

    waitForElement('input[id=":r1a:"]', (titleField) => {
        titleField.value = product.title;
        console.log("✅ Title filled successfully!");
    });

    waitForElement('input[id=":r1d:"]', (priceField) => {
        priceField.value = product.price;
        console.log("✅ Price filled successfully!");
    });
    

    // waitForElement('textarea[aria-label="Description"]', (descField) => {
    //     descField.value = product.description;
    //     console.log("✅ Description filled successfully!");
    // });
});
