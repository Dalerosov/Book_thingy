<?php

$data = file_get_contents("php://input");
$cookedData = json_decode($data, true);

$result = validate_inputs($cookedData);

if ($result == null) {
    http_response_code(400);
    exit();
}

include_once("connect.php");
include_once("../login/auth.php");

$user_id = require_login($conn);
if ($user_id == -1) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Error: User not authorized"]);
    exit();
}

// Clean strings for SQL
$name       = mysqli_real_escape_string($conn, $result["name"]);
$author     = mysqli_real_escape_string($conn, $result["author"]);
$date       = mysqli_real_escape_string($conn, $result["date_of_release"]);
$annotation = mysqli_real_escape_string($conn, $result["annotation"]);

// Numeric values and base64 can stay as-is
$rating       = floatval($result["rating"]);
$preview_image = mysqli_real_escape_string($conn, $result["preview_image"]);
$full_image    = mysqli_real_escape_string($conn, $result["full_image"]);

// Now you can safely use in SQL
$sql = "INSERT INTO book_info (name, author, date_of_release, rating, annotation, preview_image, full_image)
        VALUES ('$name', '$author', '$date', $rating, '$annotation', '$preview_image', '$full_image')";
$result = mysqli_query($conn, $sql);
if ($result) {
    echo json_encode(["success" => true, "message" => "Inserted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . mysqli_error($conn)]);
}

mysqli_close($conn);

function validate_inputs($data) {

    $errors = [];

    $name = trim($data["name"] ?? "");
    $author = trim($data["author"] ?? "");
    $date_of_release = $data["date_of_release"] ?? "";
    $rating = $data["rating"] ?? "";
    $annotation = $data["annotation"] ?? "";
    $preview_image = $data["preview_image"] ?? "";
    $full_image = $data["full_image"] ?? "";

    // name
    if (!$name)
        $errors[] = "Name is required";
    elseif (strlen($name) > 120)
        $errors[] = "Name too long";

    // author
    if (!$author)
        $errors[] = "Author is required";
    elseif (strlen($author) > 120)
        $errors[] = "Author too long";

    // date
    if (!$date_of_release) {
        $errors[] = "Date required";
    } else {
        $d = strtotime($date_of_release);
        if ($d === false)
            $errors[] = "Invalid date";
        elseif ($d > time())
            $errors[] = "Date cannot be in the future";
    }

    // rating
    if (!is_numeric($rating))
        $errors[] = "Rating must be a number";
    else {
        $r = floatval($rating);
        if ($r < 0 || $r > 5)
            $errors[] = "Rating must be between 0 and 5";
    }

    // preview image (base64)
    if (!$preview_image)
        $errors[] = "Preview image missing";

    // full image (base64)
    if (!$full_image)
        $errors[] = "Full image missing";

    if ($errors) {
        echo json_encode([
            "success" => false,
            "errors" => $errors
        ]);
        return null;
    }

    return [
        "name" => $name,
        "author" => $author,
        "date_of_release" => $date_of_release,
        "rating" => floatval($rating),
        "annotation" => $annotation,
        "preview_image" => $preview_image,
        "full_image" => $full_image
    ];
}

?>