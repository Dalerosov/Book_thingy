<?php

$jsonFile = __DIR__ . '/../../books.json';

include_once("connect.php");

include_once("../login/auth.php");

$user_id = require_login($conn);
if ($user_id == -1) {
    echo json_encode(["success" => false, "message" => "Error: User not authorized"]);
    $conn->close();
    exit();
}

if (!file_exists($jsonFile)) {
    echo json_encode(["success" => false, "message" => "Error: JSON file not found"]);
    $conn->close();
    exit();
}

$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);

if ($data === null) {
    echo json_encode(["success" => false, "message" => "Error: Invalid JSON"]);
    $conn->close();
    exit();
}

foreach ($data as $index => $row) {
    if (!is_array($row) || count($row) !== 7) {
        echo json_encode(["success" => false, "message" => "Error: Row $index is invalid: expected 7 fields"]);
    $conn->close();
        exit();
    }
}

$columns = array_keys($data[0]);
$columnList = implode(",", $columns);
$placeholders = implode(",", array_fill(0, count($columns), '?'));

$stmt = $conn->prepare("INSERT INTO book_info ($columnList) VALUES ($placeholders)");

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Error: Prepare failed: " . $conn->error]);
        $stmt->close();
    $conn->close();
        exit();
}

$types = 'ssssdss';; // assuming all strings, adjust types if needed

foreach ($data as $row) {
    $values = [];
    foreach ($columns as $col) {
        $values[] = $row[$col];
    }
    $stmt->bind_param($types, ...$values);
    if (!$stmt->execute()) {
        $stmt->close();
    $conn->close();
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
        exit();
    }
}

echo json_encode(["success" => true, "message" => "Imported " . count($data) . " records successfully."]);

$stmt->close();
$conn->close();

?>