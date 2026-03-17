<?php
// connect to db
$servername = "md390.wedos.net";
$username = "w202867_zidle2";
$password = "LpR52unv";
$database = "d202867_zidle2";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
mysqli_set_charset($conn, "utf8");
?>
