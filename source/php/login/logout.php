<?php

include "connect.php";

if (isset($_COOKIE["session"])) {

    include_once("../database/connect.php");

    $token_hash = hash("sha256", $_COOKIE["session"]);
    $token_hash = mysqli_real_escape_string($conn, $token_hash);

    $sql = "
    DELETE FROM sessions
    WHERE token_hash='$token_hash'
    ";

    mysqli_query($conn, $sql);
}

setcookie("session", "", time() - 3600, "/");

?>