<?php

include_once("../database/connect.php");
include_once("../login/auth.php");

$user_id = require_login($conn);
if ($user_id == -1) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Error: User not authorized"]);
    exit();
} else {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "User logged in"]);
}

?>