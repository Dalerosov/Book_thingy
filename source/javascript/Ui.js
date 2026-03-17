export class Ui {
    constructor () {
        this.book_container = document.getElementById("book_posting");
        this.detail_buttons = new Map();
    }
    Display_books(books_to_display) {
        this.detail_buttons = new Map();
        const parent = document.getElementById("books_container");

        books_to_display.active_books.forEach((book, i) => {

            const container = document.getElementById("book_posting_" + i) ?? document.createElement("div");
            container.id = "book_posting_" + i;
            container._book_id = book.id;
            container.classList.add("preview_container");
            container.replaceChildren();

            const title = document.createElement("p");
            title.classList.add("book_title");
            title.classList.add("preview_title");
            title.classList.add("preview_class");
            title.textContent = book.name;
            
            const author = document.createElement("p");
            author.classList.add("author");
            author.classList.add("preview_class");
            author.textContent = book.author;
            
            const date = document.createElement("p");
            date.classList.add("release_date");
            date.classList.add("preview_class");
            date.textContent = book.date_of_release;

            const prev_img = document.createElement("img");
            prev_img.src = book.preview_image; // or "data:image/png;base64," + book.base64
            prev_img.classList.add("preview_image");

            const detail_button = document.createElement("button");
            detail_button.textContent = "Detail"
            detail_button.classList.add("detail_button");

            this.detail_buttons.set(book.id, detail_button);

            container.appendChild(prev_img);
            container.appendChild(title);
            container.appendChild(author);
            container.appendChild(date);
            container.appendChild(detail_button);

            this.book_container.appendChild(container);
        });
    }

    Get_detail_buttons() {
        return this.detail_buttons;
    }


    // Prepare details before displaying
    Create_detail(book_detail) {
        const container = Array.from(this.book_container.children).find(item => item._book_id == book_detail.id);

        for (let c of container.children) {
            if (c.classList.contains("detail")) {
                return;
            }
        }

        const title = document.createElement("p");
        title.classList.add("book_title");
        title.textContent = book_detail.name;
        
        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = book_detail.author;
        
        const date = document.createElement("p");
        date.classList.add("release_date");
        date.textContent = book_detail.date_of_release;
        
        const detail_text = document.createElement("div");
        detail_text.classList.add("detail_content");

        const detail_container = document.createElement("div");
        detail_container.classList.add("detail");
        detail_container.addEventListener("click", () => {
            this.Hide_detail(book_detail);
        })
        detail_container.style.display = "none";

        const detail_background = document.createElement("div");
        detail_background.classList.add("detail_background");


        const annotation = document.createElement("p");
        annotation.textContent = book_detail.annotation;

        const full_image = document.createElement("img");
        full_image.src = book_detail.full_image;
        full_image.classList.add("detail_image");

        const rating = document.createElement("p");
        rating.textContent = Number(book_detail.rating).toFixed(1) + "*";

        detail_text.appendChild(title);
        detail_text.appendChild(author);
        detail_text.appendChild(date);

        detail_text.appendChild(rating);
        detail_text.appendChild(annotation);
        

        detail_background.appendChild(full_image);
        detail_background.appendChild(detail_text)

        detail_container.appendChild(detail_background);

        container.appendChild(detail_container);
    }

    async Display_detail(book) {
        const container = Array.from(this.book_container.children).find(item => item._book_id == book.id);
        while (!book.full_image) {
            await new Promise(r => setTimeout(r, 50));
        }
        document.getElementById("print_button").style.display = "block";
        document.body.style.overflow = "hidden";
        for (let c of container.children) {
            if (c.classList.contains("detail")) {
                c.style.display = "block";
            }
        }
    }

    Hide_detail(book) {
        const container = Array.from(this.book_container.children).find(item => item._book_id == book.id);
        document.getElementById("print_button").style.display = "none";
        document.body.style.overflow = "scroll";
        for (let c of container.children) {
            if (c.classList.contains("detail")) {
                c.style.display = "none";
            }
        }
    }

    // login

    Logged_in() {
        document.getElementById("user_input").classList.add("hide_login_item");
        document.getElementById("password_input").classList.add("hide_login_item");
        document.getElementById("user_input").value = "";
        document.getElementById("password_input").value = "";
        document.getElementById("login_button").classList.add("hide_login_item");
        document.getElementById("logout_button").classList.remove("hide_login_item");
        document.getElementById("add_book").classList.remove("hide_login_item");
    }

    Logged_out() {
        document.getElementById("user_input").classList.remove("hide_login_item");
        document.getElementById("password_input").classList.remove("hide_login_item");
        document.getElementById("login_button").classList.remove("hide_login_item");
        document.getElementById("logout_button").classList.add("hide_login_item");
        document.getElementById("add_book").classList.add("hide_login_item");
    }
}