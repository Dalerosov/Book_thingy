<!DOCTYPE html>
<html lang='cs'>
<head>
    <title>Katalog E-Knih</title>
    <meta charset='utf-8'>
    <meta name='author' content='Jan Zidlicky'>
    <link href='./img/icon.png' rel='shortcut icon' type='image/png'>
    <link href="./css/style.css" rel="stylesheet" type="text/css">
    <script type="module" src="./javascript/main.js?v=1.0.0"></script>

</head>
<body>
    <div class="navbar">
        <p class="global_nav_title">Book Bazaar</p>
        <button id="print_button" class="print_button no_print" style="display:none">Print</button>
    </div>
    <div class="logic_div">
        <div class="control_buttons">
            <select id="order_by">
                <option value="id" selected>Date Added</option>
                <option value="name">Name</option>
                <option value="author">Author</option>
                <option value="date_of_release">Release Date</option>
            </select>
            <select id="is_ascending">
                <option value="ASC">Ascending</option>
                <option value="DESC" selected>Descending</option>
            </select>
            <button id="prev_button"><</button>
            <button id="next_button">></button>
        </div>
        <div id="book_posting"></div>
        <div class="control_buttons">
            <select id="order_by2">
                <option value="id" selected>Date Added</option>
                <option value="name">Name</option>
                <option value="author">Author</option>
                <option value="date_of_release">Release Date</option>
            </select>
            <select id="is_ascending2">
                <option value="ASC">Ascending</option>
                <option value="DESC" selected>Descending</option>
            </select>
            <button id="prev_button2"><</button>
            <button id="next_button2">></button>
        </div>
        <div class="bcg"></div>
        <div class="credits">
            <p>Created by Jan Židlický</p>
        </div>
    </div>
    
</body>
</html>