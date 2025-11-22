# Simple Bookstore Website

This is a simple static website I once built to showcase books in a gallery format. It includes a main page (`index.html`), an imprint/legal notice (`imprint.html`), and basic styling and scripts. The code is now published for anyone who might find it useful or wants to adapt it for their own purposes.

## Features
- Responsive image gallery for books
- Modal preview with Amazon link integration
- Basic imprint and privacy information
- Minimal dependencies (pure HTML, CSS, JS)

## Usage
- To properly inspect the website download or clone this repository and open `index.html` with your preferred internet browser.
- To publish a website based on this template modify the content to your liking and upload all files to your hosting service or serve them via your own Linux server and a reverse proxy of your choice. 

## Howto add or modify a book
- Feel free to modify, share, or improve the code as you wish!

- To add a book to the gallery or change an existing entry, edit the HTML in `index.html` inside the `.image-gallery` container. Each book is represented by a single `.image-item` element. 

    Copy/paste the example below and update the values `data-src` (cover image), `data-title` (book title), `data-description` (blurb) and `data-link` (link to your shop / where to buy the book) with your book's data:
    ```html
    <div class="image-item" tabindex="0"
        data-src="images/cover.jpg"
        data-title="Title of the Book"
        data-description="Short description of the Book, resp. the blurb. "
        data-link="https://amazon.com/your-book-link">
        <img class="thumb" loading="lazy" src="" alt="">
    </div>
    ```
    Thereby, you should not modify the following line as src="" and alt="" will automatically be set to data-src image link and data-title respectively via javascript. Leave as is: 
    ```html
    <img class="thumb" loading="lazy" src="" alt="">
    ```

## Disclaimer
**Important:**
Everyone who uses this code must check and adapt the imprint (`imprint.html`) and all legal information themselves. I do **not** take any responsibility for the correctness, completeness, or legal compliance of the imprint or any other content. Use at your own risk.
