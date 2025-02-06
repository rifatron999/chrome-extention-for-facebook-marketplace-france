chrome.storage.local.get("productData", function (result) {
    let product = result.productData;

    document.querySelector('input[aria-label="Title"]').value = product.title;
    document.querySelector('input[aria-label="Price"]').value = product.price;
    document.querySelector('textarea[aria-label="Description"]').value = product.description;
    
    // Upload image (simulated - manual intervention may be needed)
    let imageInput = document.querySelector('input[type="file"]');
    let file = new File([""], product.images[0], { type: "image/jpeg" });
    let dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    imageInput.files = dataTransfer.files;

    console.log("Product details filled!");
});
