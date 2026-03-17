import { Cached_books } from './state.js?v=1.0.58';
import { Ui } from './Ui.js?v=1.0.48'

let cached_books = new Cached_books();
let ui_instance = new Ui();

let page = 0;
let order_by = "id";
let is_asc = "DESC";

async function Start() {
    Redraw();
    if (window.location.href.endsWith("/admin/")) {
        setInterval(Check_logged_in, 60_000);
        Check_logged_in();
    }
}

async function Check_logged_in() {
    let result = await cached_books.Check_logged_in();
    User_logged_in(result);
}

async function Redraw() {
    await cached_books.Select_active_books(page * 20, order_by, is_asc)
    ui_instance.Display_books(cached_books)
    let detail_buttons = ui_instance.Get_detail_buttons();
    Setup_detail_event_listeners(detail_buttons);
}

async function Print_detail() {
    window.print();
}


function Setup_detail_event_listeners(detail_buttons) {

    detail_buttons.forEach((detail_button, book_id) => {
        detail_button.addEventListener("click", () => {
                let book_with_detail = cached_books.Get_book_by_id(book_id)
                ui_instance.Display_detail(book_with_detail);
            });
    });

    // prefetch detail when hovered over
    detail_buttons.forEach((detail_button, book_id) => {
        detail_button.addEventListener("mouseenter", async () => {
                let book_with_detail = await cached_books.Get_book_detail(book_id);
                ui_instance.Create_detail(book_with_detail);
            });
    });
    
}


function Setup_main_event_listeners() {

    // Sets up all global control button listeners
    if(document.getElementById("login_button")) {
        document.getElementById("login_button").addEventListener("click", async () => {
            let user_name = document.getElementById("user_input").value;
            let password = document.getElementById("password_input").value;
            let logged_in = await cached_books.Log_in(user_name, password);
            if (!logged_in) {
                alert("wrong user name or password has been entered");
            }
            User_logged_in(logged_in);
        })

        document.getElementById("logout_button").addEventListener("click", async () => {
            cached_books.Log_out();
            ui_instance.Logged_out();
        })
        document.getElementById("add_book_button").addEventListener("click", async () => {
            let result = await validate_inputs();
            if (!result) {
                return;
            }
            console.log(result)
            await cached_books.Upload_book(result);
            Redraw();
        })
        document.getElementById("inmport_books_from_json").addEventListener("click", async () => {
            await cached_books.Import_books_from_json();
            Redraw();
        })
    }
    

    

    document.getElementById("prev_button").addEventListener("click", function () {
        if (page > 0) {page--;
            document.getElementById("prev_button2").scrollIntoView({
            behavior: 'smooth', // smooth animation
            block: 'start'     // align element at top of viewport
        });
        }
        Redraw();
    });
    document.getElementById("prev_button2").addEventListener("click", function () {
        if (page > 0) {page--;}
        Redraw();
    });
    document.getElementById("next_button").addEventListener("click", function () {
        if (cached_books.Get_active_amount > 19) {page++;}
        Redraw();
    });
    document.getElementById("next_button2").addEventListener("click", function () {
        if (cached_books.Get_active_amount > 19) {page++;
            document.getElementById("next_button").scrollIntoView({
            behavior: 'smooth', // smooth animation
            block: 'start'     // align element at top of viewport
        });
        }
        
        Redraw();
    });
    document.getElementById("order_by").addEventListener("change", function () {    
        order_by = this.value;
        page = 0;
        document.getElementById("next_button").scrollIntoView({
            behavior: 'smooth', // smooth animation
            block: 'start'     // align element at top of viewport
        });
        document.getElementById("order_by2").selectedIndex = this.selectedIndex;
        Redraw();
    });
    document.getElementById("order_by2").addEventListener("change", function () {    
        order_by = this.value;
        page = 0;
        document.getElementById("next_button").scrollIntoView({
            behavior: 'smooth', // smooth animation
            block: 'start'     // align element at top of viewport
        });
        document.getElementById("order_by").selectedIndex = this.selectedIndex;
        Redraw();
    });
    document.getElementById("is_ascending").addEventListener("change", function () {    
        is_asc = this.value;
        page = 0;
        document.getElementById("next_button").scrollIntoView({
            behavior: 'smooth', // smooth animation
            block: 'start'     // align element at top of viewport
        });
        document.getElementById("is_ascending2").selectedIndex = this.selectedIndex;
        Redraw();
    });
    document.getElementById("is_ascending2").addEventListener("change", function () {    
        is_asc = this.value;
        page = 0;
        document.getElementById("next_button").scrollIntoView({
            behavior: 'smooth', // smooth animation
            block: 'start'     // align element at top of viewport
        });
        document.getElementById("is_ascending").selectedIndex = this.selectedIndex;
        Redraw();
    });

    document.getElementById("print_button").addEventListener("click", async () =>{
        Print_detail();
    })
}

    // not a pure function, i know, but this saves me some overhead later
    async function validate_inputs() {
        var name = document.getElementById("name_input").value.trim();
        var author = document.getElementById("author_input").value.trim();
        var date_of_release = document.getElementById("date_input").value;
        var rating = document.getElementById("rating_input").value;
        var titlePage = document.getElementById("image_input").files[0];
        var annotation = document.getElementById("annotation_input").files[0];

        document.getElementById("name_input").value = "";
        document.getElementById("author_input").value = "";
        document.getElementById("date_input").value;
        document.getElementById("rating_input").value;
        document.getElementById("image_input").files = [];
        document.getElementById("annotation_input").files = [];

        const errors = [];

        // name
        if (!name)
            errors.push("Name is required");
        else if (name.length > 120)
            errors.push("Name too long");

        // author
        if (!author)
            errors.push("Author is required");
        else if (author.length > 120)
            errors.push("Author too long");

        // date_of_release
        if (!date_of_release) {
            errors.push("Date required");
        } else {
            const d = new Date(date_of_release);
            const today = new Date();
            if (isNaN(d.getTime()))
                errors.push("Invalid date");
            else if (d > today)
                errors.push("Date cannot be in the future");
        }

        // rating
        const r = parseFloat(rating);
        if (isNaN(r))
            errors.push("Rating must be a number");
        else if (r < 0 || r > 5)
            errors.push("Rating must be between 0 and 5");

        // title page image
        if (!titlePage) {
            errors.push("Title page required");
        } else if (!titlePage.type.startsWith("image/")) {
            errors.push("Title page must be an image");
        }

        if (errors.length) {
            alert(errors.join("\n"));
            return null;
        }


        const preview_image = await compressAndConvertToBase64(titlePage, 0.1);
        const full_image = await compressAndConvertToBase64(titlePage, 0.7);

        annotation = await read_text_file(annotation);

        const data = {name,
            author,
            date_of_release,
            rating,
            annotation,
            preview_image,
            full_image
        }
        return data;
    }

    function compressAndConvertToBase64(file, quality = 0.7) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');

                    // Optional: scale large images down for performance
                    const MAX_DIM = 1024;
                    let width = img.width;
                    let height = img.height;
                    if (width > MAX_DIM || height > MAX_DIM) {
                        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
                        width = width * ratio;
                        height = height * ratio;
                    }
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    resolve(canvas.toDataURL('image/jpeg', quality));
                };
                img.onerror = () => reject('Image failed to load');
                img.src = e.target.result;
            };
            reader.onerror = () => reject('FileReader failed');
            reader.readAsDataURL(file);
        });
    }

    function read_text_file(file) {
        return new Promise((resolve, reject) => {
            if (!file) return resolve("");  // handle empty file

            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject('Failed to read file');
            reader.readAsText(file);
        });
    }

async function User_logged_in(logged_in) {
        console.log("Logged in: " + logged_in)
        if (logged_in) {
            ui_instance.Logged_in();
        } else {
            ui_instance.Logged_out();
        }
}


document.addEventListener("DOMContentLoaded", () => {
    Setup_main_event_listeners();
});


Start()