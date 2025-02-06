<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Define the images directory
$imageDir = "images";

// Function to get base64-encoded images from a folder
function getImages($directory) {
    $images = [];
    
    // Check if directory exists
    if (is_dir($directory)) {
        $files = scandir($directory); // Get all files in the folder

        foreach ($files as $file) {
            if ($file !== "." && $file !== "..") { // Ignore special directories
                $filePath = $directory . "/" . $file;

                // Ensure it's a valid image file
                if (is_file($filePath) && getimagesize($filePath)) {
                    // Read the file contents and encode as base64
                    $imageData = base64_encode(file_get_contents($filePath));
                    $mimeType = mime_content_type($filePath);

                    // Append to images array
                    $images[] = "data:$mimeType;base64,$imageData";
                }
            }
        }
    }
    
    return $images;
}

// Fetch images from the 'images' folder
$images = getImages($imageDir);

$products = [
    "title" => "iPhone 12",
    "price" => "450",
    "category" => "Electronics",
    "description" => "Good condition, available for pickup.",
    "images" => $images // Now contains base64-encoded images
];

echo json_encode($products);
?>
