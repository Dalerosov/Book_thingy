<!DOCTYPE html>
<html lang='cs'>
<head>
    <title>Katalog E-Knih</title>
    <meta charset='utf-8'>
    <meta name='author' content='Jan Zidlicky'>
    <link href='./img/icon.png' rel='shortcut icon' type='image/png'>
    <link href="../css/style.css" rel="stylesheet" type="text/css">
    <script type="module" src="../javascript/main.js?v=1.0.0"></script>

</head>
<body>
    <div class="printing_screen print_only"></div>
    <div class="navbar">
        <p class="global_nav_title">Book Bazaar</p>
        <button id="print_button" class="print_button no_print" style="display:none">Print</button>
        <div class="login_menu">
            <input class="login_menu_item" placeholder="Username" id="user_input" type="text">
            <input class="login_menu_item" placeholder="Password" id="password_input" type="password">
            <button class="login_menu_item" id="login_button">Log in</button>
            <button class="login_menu_item hide_login_item" id="logout_button">Log out</button>
        </div>
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
        <div class="bcg">
            <div class="form_container hide_login_item" id="add_book">
                <h1>Add book</h1>

                <label>Name</label>
                <input id="name_input" type="text">

                <label>Author</label>
                <input id="author_input" type="text">

                <label>Date of release</label>
                <input id="date_input" type="date">

                <label>Rating</label>
                <input id="rating_input" type="number" step="0.1" min="0" max="5">

                <label>Title page</label>
                <input id="image_input" type="file" accept="image/*">

                <label>Annotation</label>
                <input id="annotation_input" type="file" accept=".txt">

                <button id="add_book_button">Add book</button>
                <button id="inmport_books_from_json">Start import from JSON</button>
            </div>
        </div>
        <div class="credits">
            <p>Created by Jan Židlický</p>
        </div>
    </div>
</body>
</html>