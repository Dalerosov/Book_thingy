<?php

    $data = file_get_contents("php://input");
    $cookedData = json_decode($data, true);

    $offset = intval($cookedData['offset'] ?? 0);
    $order_by_raw = $cookedData['order_by'] ?? "id";
    $order_desc_raw = $cookedData['desc'] ?? "DESC";
    

    $allowed_columns = ['id','name','author','date_of_release'];
    $order_by = in_array($order_by_raw, $allowed_columns) ? $order_by_raw : 'id';

    $allowed_orders = ['ASC', 'DESC'];
    $order_desc = in_array($order_desc_raw, $allowed_orders) ? $order_desc_raw : "DESC";

    include_once("connect.php");

    $sql = "SELECT id, name, author, date_of_release, preview_image
            FROM book_info
            ORDER BY $order_by $order_desc
            LIMIT 20 OFFSET $offset";

    $result = mysqli_query($conn, $sql);

    $rows = [];
    while($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }

    echo json_encode($rows);

    mysqli_close($conn);
?>