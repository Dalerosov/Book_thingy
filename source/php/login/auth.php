<?php

function require_login($conn) {

    if (!isset($_COOKIE["session"])) {
        http_response_code(401);
        exit();
    }

    $token = $_COOKIE["session"];
    $token_hash = hash("sha256", $token);

    include_once("../database/connect.php");

    $token_hash = mysqli_real_escape_string($conn, $token_hash);

    $sql = "
    SELECT user_id
    FROM sessions
    WHERE token_hash='$token_hash'
    AND expires > NOW()
    ";

    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);

    if (!$row) {
        return -1;
    }

    return intval($row["user_id"]);
}

?>