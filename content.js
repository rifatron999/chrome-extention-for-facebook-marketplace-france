chrome.storage.local.get("productData", function (result) {
    if (!result.productData) {
        console.error("Error: No product data found in storage.");
        return;
    }

    let product = result.productData;

    // Ensure all fields exist before accessing them
    if (!product.title || !product.price || !product.description) {
        console.error("Error: Missing product fields", product);
        return;
    }

    // Fill the form fields
    document.querySelector('input[aria-label="Title"]').value = product.title;
    document.querySelector('input[aria-label="Price"]').value = product.price;
    document.querySelector('textarea[aria-label="Description"]').value = product.description;

    console.log("Product details filled successfully!");
});
