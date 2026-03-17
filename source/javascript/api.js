export class Api {

    Get_book_detail(id) {
        let final_data;
        fetch("get_books.php", // TODO FIX
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    book_id: id
                })
            }
        )
            .then(result => result.json())
            .then(data => {
                console.log(data);
                final_data = data;
            })
        return final_data;
    }


    async Get_book_previews(order_by, offset, desc) {
        try {
            const response = await fetch("../php/database/get_books.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_by, offset, desc})
            });

            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Failed to fetch book previews:", error);
            return []; 
        }
    }

    async Get_book_order_specifics(order_by, offset, desc) {
        try {
            const response = await fetch("../php/database/get_book_data_specifics.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_by, offset, desc})
            });

            const data = await response.json();

            return data;

        } catch (error) {
            console.error("Failed to fetch data:", error);
            return []; 
        }
    }

    async Get_book_details(book_id) {
        try {
            const response = await fetch("../php/database/get_book_details.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ book_id})
            });

            const data = await response.json();

            return data[0];

        } catch (error) {
            console.error("Failed to fetch book details:", error);
            return []; 
        }
    }

    async User_login(user_name, password) {
        try {
            const response = await fetch("../php/login/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_name, password }),
                credentials: "include"
            });

            console.log("Login status:", response.status);
            return response.status === 200  ? true : false; // 200 = success, 401 = fail

        } catch (error) {
            console.error("Failed to login:", error);
            return false; 
        }
    }

    async Check_logged_in() {
        try {
            const response = await fetch("../php/login/check_logged_in.php", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            console.log("Login status:", response.status);
            return response.status === 200  ? true : false; // 200 = success, 401 = fail

        } catch (error) {
            console.error("Failed to check login:", error);
            return false; 
        }
    }

    async User_logout() {
        try {
            const response = await fetch("../php/login/logout.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            console.log("Login status:", response.status);
            return response.status === 200  ? true : false; // 200 = success, 401 = fail

        } catch (error) {
            console.error("Failed to logout:", error);
            return false; 
        }
    }

    async Import_books_from_json() {
        try {
            const response = await fetch("../php/database/import_books_from_json.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            console.log("Import from json:", response);
            let result = await response.json();
            return result;

        } catch (error) {
            console.error("Failed to upload books from json:", error);
            return false; 
        }
    }

    async Upload_book(book) {
        let name = book.name;
        let author = book.author;
        let date_of_release = book.date_of_release;
        let annotation = book.annotation;
        let rating = book.rating;
        let preview_image = book.preview_image;
        let full_image = book.full_image;

        try {
            const response = await fetch("../php/database/upload_book.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, author, date_of_release, annotation, rating, preview_image, full_image }),
                credentials: "include"
            });

            const data = await response.json();

            return data[0];

        } catch (error) {
            console.error("Failed to upload book:", error);
            return []; 
        }
    }
}