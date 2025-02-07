<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json'); // Ensure response is JSON format

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? '';
    $price = $_POST['price'] ?? '';
    $description = $_POST['description'] ?? '';
    $category = $_POST['category'] ?? '';
    $conditionf = $_POST['conditionf'] ?? '';
    $status = $_POST['status'] ?? '';

    if (empty($title) || empty($price) || empty($description)) {
        echo json_encode(["message" => "Missing required fields"]);
        exit;
    }

    // Handle multiple image uploads
    $imagePaths = [];
    if (!empty($_FILES['images']['name'][0])) {
        $uploadDir = "uploads/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        foreach ($_FILES['images']['tmp_name'] as $key => $tmpName) {
            $imageName = time() . "_" . $_FILES['images']['name'][$key];
            $filePath = $uploadDir . $imageName;
            if (move_uploaded_file($tmpName, $filePath)) {
                $imagePaths[] = $filePath;
            }
        }
    }

    // Convert images to JSON format
    $imageJson = !empty($imagePaths) ? json_encode($imagePaths) : null;

    // Database Connection
    $conn = new mysqli("localhost", "root", "", "chrome_extension");
    if ($conn->connect_error) {
        echo json_encode(["message" => "Database connection failed"]);
        exit;
    }

    // Insert Data
    $stmt = $conn->prepare("INSERT INTO products (title, price, description, category, conditionf, status, images) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $title, $price, $description, $category, $conditionf, $status, $imageJson);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product uploaded successfully"]);
    } else {
        echo json_encode(["message" => "Error uploading product"]);
    }

    $stmt->close();
    $conn->close();
}
?>
