<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "chrome_extension");

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$sql = "SELECT id, title, price, category, `condition`, status, images FROM products ORDER BY id DESC";
$result = $conn->query($sql);

$products = [];
while ($row = $result->fetch_assoc()) {
    $row['images'] = json_decode($row['images']); // Decode image JSON
    $products[] = $row;
}

echo json_encode($products);
$conn->close();
?>
