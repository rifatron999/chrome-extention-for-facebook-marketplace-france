chrome.storage.local.get("productData", function (result) {
    if (!result || !result.productData) {
        console.error("Error: No product data found in storage.");
        return;
    }

    let product = result.productData;

    // Ensure required fields exist before accessing them
    if (!product.title || !product.price || !product.description) {
        console.error("Error: Missing product fields", product);
        return;
    }

    // Wait for the page to fully load before filling fields
    setTimeout(() => {
        let titleField = document.querySelector('input[aria-label="Title"]');
        let priceField = document.querySelector('input[aria-label="Price"]');
        let descField = document.querySelector('textarea[aria-label="Description"]');

        if (titleField && priceField && descField) {
            titleField.value = product.title;
            priceField.value = product.price;
            descField.value = product.description;
            console.log("✅ Product details filled successfully!");
        } else {
            console.error("❌ Error: Could not find form fields.");
        }
    }, 2000); // Delay to allow elements to load
});
