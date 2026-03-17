<?php

    $data = file_get_contents("php://input");
    $cookedData = json_decode($data, true);

    $form_password = $cookedData["password"] ?? "";
    $form_username = $cookedData["user_name"] ?? "";



    include_once("../database/connect.php");

    $form_username = mysqli_real_escape_string($conn, $form_username);

    $sql = "SELECT id, password_hash
    FROM users
    WHERE username = '$form_username'";

    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);

    if (!$row || !password_verify($form_password, $row["password_hash"])) {
        http_response_code(401);
        exit();
    }

    $user_id = intval($row["id"]);

    $token = bin2hex(random_bytes(32));
    $token_hash = hash("sha256", $token);
    $expires = date("Y-m-d H:i:s", time() + 60*60);

    $token_hash = mysqli_real_escape_string($conn, $token_hash);
    
    $sql = "
    INSERT INTO sessions (user_id, token_hash, expires)
    VALUES ($user_id, '$token_hash', '$expires')
    ";
    

    mysqli_query($conn, $sql);
    
    setcookie(
        "session",
        $token,
        [
            "expires" => time() + 60*60*24*30,
            "path" => "/",
            "secure" => true,
            "httponly" => true,
            "samesite" => "Strict"
        ]
    );
    mysqli_close($conn);
?>