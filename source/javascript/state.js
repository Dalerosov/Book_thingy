import { Api } from "./api.js?v=1.0.30"
import {Sort_by} from "./helper.js?v=1.0.0"
class Book {
    constructor(id, name, author, date_of_release, preview_image, annotation = null, rating = null, full_image = null) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.date_of_release = date_of_release;
        this.annotation = annotation;
        this.rating = rating;
        this.preview_image = preview_image;
        this.full_image = full_image;
    }

}

export class Cached_books {
    constructor() {
        this.stored_books = [];
        this.active_books = [];
        // there should be a separate class for the whole state, but i realised too late and it would take too long to fix now, so im going to break a rule and use this class for login also
        this.api_instance = new Api();
        this.logged_in = false;
    }

    Get_active_amount() {
        return this.active_books.length();
    }

    Add_books(books_json) {
        books_json.forEach(book => {
            if (!this.stored_books.some(stored_book => stored_book.id === book.id)) {
                this.stored_books.push(book);
            }
        });
    }

    Get_book_by_id(book_id) {
        return this.stored_books.find(book => book.id == book_id);
    }

    async Select_active_books(offset, order_by, desc) {
        // First check if any book is missing from cache, if yes, import them all
        let order_data = await this.api_instance.Get_book_order_specifics(order_by, offset, desc);
        const missingExists = order_data.some(orderBook =>
            !this.stored_books.some(stored_book => stored_book.id === orderBook.id)
        );
        
        if (missingExists) {
            console.log("Importing missing")
            await this.Import_book_previews(offset,order_by,desc);
        }

        let ordered_books = [];
        // check if it is requested to get books ordered by id desc, to avoid unnescesary sorting
        if (order_by === "id" && desc === "DESC") {
            // just pass pointer
            ordered_books = this.stored_books;
        } else {
            // slice first to create a copy and avoid sorting in place
            ordered_books = Sort_by(this.stored_books, order_by, desc);
        }

        //  20 results by reference
        this.active_books.length = 0; // clear
        for (let i = offset; i < offset + 20 && i < ordered_books.length; i++) {
            this.active_books.push(ordered_books[i]);
        }

        console.log(order_data)
        return []
    }


    // DATABASE REFERENCES

    async Import_book_previews(offset, order_by, desc) {
    let books_json = await this.api_instance.Get_book_previews(order_by, offset, desc);
    this.Add_books(
        books_json.map(b => new Book(
            b.id,
            b.name,
            b.author,
            b.date_of_release,
            b.preview_image
        ))
    );
    return []
    }

    async Get_book_detail(id) {
        // check if data isnt already imported, to not import twice
        const book = this.stored_books.find(book => book.id === id);
        if (!book.annotation) {
            let book_details = await this.api_instance.Get_book_details(id);
            book.annotation = book_details.annotation;
            book.full_image = book_details.full_image;
            book.rating = book_details.rating;
            console.log("importing book details")
        }
        
        return book;

        
    }


    // Login functions

    async Log_in(username, password) {
        this.logged_in = await this.api_instance.User_login(username, password);
        return this.logged_in;
    }

    Log_out() {
        this.logged_in = false;
        this.api_instance.User_logout();
    }

    async Check_logged_in() {
        let result = await this.api_instance.Check_logged_in();
        if (result) {
            this.logged_in = true;
        }
        return result;
    }

    async Import_books_from_json() {
        let result = await this.api_instance.Import_books_from_json();
        if (result.success) {
            alert("books successfuly imported");
        }
        else {
            console.log(result);
            alert(result.message);
        }
    }

    async Upload_book(b) {
        let new_book = []
        new_book.push(new Book(b.id,
            b.name,
            b.author,
            b.date_of_release,
            b.preview_image,
            b.annotation,
            b.rating,
            b.full_image
        ));
        console.log(new_book);
        let result = await this.api_instance.Upload_book(new_book);
        console.log(result);
    }

}


