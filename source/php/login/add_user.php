<?php
// add_user.php
include_once("../database/connect.php");

// simple POST form processing
$message = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!$username || !$password) {
        $message = "Username and password are required.";
    } else {

        // hash password with Argon2id
        $hash = password_hash($password, PASSWORD_ARGON2ID);

        // escape values for SQL
        $username_esc = mysqli_real_escape_string($conn, $username);
        $hash_esc = mysqli_real_escape_string($conn, $hash);

        $sql = "INSERT INTO users (username, password_hash) VALUES ('$username_esc', '$hash_esc')";

        if (mysqli_query($conn, $sql)) {
            $message = "User '$username' added successfully.";
        } else {
            $message = "Error adding user: " . mysqli_error($conn);
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Master User</title>
</head>
<body>
    <h2>Add Master User</h2>
    <?php if ($message) echo "<p>$message</p>"; ?>
    <form method="post">
        <label>
            Username: <input type="text" name="username" required>
        </label><br><br>
        <label>
            Password: <input type="password" name="password" required>
        </label><br><br>
        <button type="submit">Add User</button>
    </form>
</body>
</html>