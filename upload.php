<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $price = $_POST['price'];
    $description = $_POST['description'];

    if (isset($_FILES['image'])) {
        $imageName = time() . "_" . $_FILES['image']['name'];
        move_uploaded_file($_FILES['image']['tmp_name'], "uploads/" . $imageName);
        $imagePath = "uploads/" . $imageName;
    } else {
        $imagePath = null;
    }

    // Connect to Database
    $conn = new mysqli("localhost", "root", "", "chrome_extension");
    
    if ($conn->connect_error) {
        die(json_encode(["message" => "Database connection failed"]));
    }

    $stmt = $conn->prepare("INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siss", $title, $price, $description, $imagePath);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product uploaded successfully"]);
    } else {
        echo json_encode(["message" => "Error uploading product"]);
    }

    $stmt->close();
    $conn->close();
}
?>
