<?php

    $data = file_get_contents("php://input");
    $cookedData = json_decode($data, true);

    $id = intval($cookedData['book_id'] ?? 0);
    
    include_once("connect.php");

    $sql = "SELECT annotation, rating, full_image
            FROM book_info
            WHERE `id` = $id";

    $result = mysqli_query($conn, $sql);

    $rows = [];
    while($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }

    echo json_encode($rows);

    mysqli_close($conn);
?>