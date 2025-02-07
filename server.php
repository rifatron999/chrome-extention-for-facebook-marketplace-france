<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Get the JSON request body
$data = json_decode(file_get_contents("php://input"), true);
$productID = $data['value'] ?? null;

if (!$productID) {
    echo json_encode(["error" => "Invalid product ID"]);
    exit;
}

// Database connection
$conn = new mysqli("localhost", "root", "", "chrome_extension");

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Fetch product details
$sql = "SELECT title, price, category, description, images FROM products WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $productID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $product = $result->fetch_assoc();
    
    // Decode JSON image paths
    $image_paths = json_decode($product['images'], true);
    $product['images'] = [];

    if (is_array($image_paths)) {
        foreach ($image_paths as $path) {
            if (file_exists($path)) {
                $imageData = base64_encode(file_get_contents($path));
                $product['images'][] = "data:image/jpeg;base64," . $imageData;
            } else {
                $product['images'][] = null; // Handle missing image case
            }
        }
    }

    echo json_encode($product);
} else {
    echo json_encode(["message" => "Product not found"]);
}

$stmt->close();
$conn->close();
?>
