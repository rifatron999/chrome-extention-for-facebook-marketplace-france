<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (or specify your domain instead of '*')
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow necessary headers
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database connection
$conn = new mysqli("localhost", "root", "", "chrome_extension");

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Get the JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(["error" => "Product ID is required"]);
    exit;
}

$productId = (int) $data['id']; // Ensure it's an integer

// Update query
$sql = "UPDATE products SET is_published = 1 WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $productId);

if ($stmt->execute()) {
    echo json_encode(["success" => "Product updated successfully"]);
} else {
    echo json_encode(["error" => "Failed to update product"]);
}

$stmt->close();
$conn->close();
?>
