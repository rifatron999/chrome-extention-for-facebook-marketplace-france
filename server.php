<?php
header("Content-Type: application/json");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$products = [
    "title" => "iPhone 12",
    "price" => "450",
    "category" => "Electronics",
    "description" => "Good condition, available for pickup.",
    "images" => ["https://adminapi.applegadgetsbd.com/storage/media/large/Gold-5985.jpg"]
];

echo json_encode($products);
?>
