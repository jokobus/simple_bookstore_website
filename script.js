/**
 * This script controls the functionality of the image gallery,
 * including loading the thumbnails and displaying a modal
 * lightbox when an image is clicked.
 */

// --- 1. Global DOM Element References ---
const modal = document.getElementById('modal');
const modalLink = document.getElementById('modal-link');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const firstFocusableElement = modal.querySelector('button');

// --- 2. Page Load Initialization ---
// This script runs automatically when the page is loaded and ensures that the preview of the images is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find all the gallery items on the page
    const galleryItems = document.querySelectorAll('.image-item');
    // Loop through each item
    galleryItems.forEach(item => {
        // Get the data from the div's data-* attributes
        const imgSrc = item.dataset.src;
        const imgTitle = item.dataset.title;
        // Find the <img> tag inside this specific item
        const thumbImage = item.querySelector('.thumb');
        // If an image tag is found, update it
        if (thumbImage) {
            // Set the image source
            thumbImage.src = imgSrc;
            // Set the alt text for accessibility
            thumbImage.alt = imgTitle + " — Description preview";
        }
    });
});

// --- 3. Modal Functions ---

/**
 * Extracts data from the clicked element and calls openModal.
 * @param {HTMLElement} element The clicked .image-item div.
 */
function triggerOpenModal(element) {
    const src = element.dataset.src;
    const title = element.dataset.title;
    const description = element.dataset.description;
    const link = element.dataset.link;

    openModal(src, title, description, link);
}

/**
 * Opens and populates the modal with the image information.
 * @param {string} src - URL of the large image.
 * @param {string} title - Title for the heading.
 * @param {string} description - Description text.
 * @param {string} [linkUrl] - Optional URL for the Amazon link.
 */
function openModal(src, title, description, linkUrl) { 
    
    // Avoid multiplication of amazon rows
    const existingAmazonRow = modal.querySelector('.amazon-row');
    if (existingAmazonRow) {
    existingAmazonRow.remove();
    }

    // Populate modal with data
    modalImage.src = src;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    modalLink.href = linkUrl; 

    // // Dynamically create the "Get it on Amazon" link if a URL is provided
    if (linkUrl) {
    // Find the caption element to append our new link row to
    const caption = modal.querySelector('.caption');
    // Create the container div
    const amazonRow = document.createElement('div');
    amazonRow.className = 'amazon-row'; // Use your existing CSS class
    // Create the link element
    const amazonLink = document.createElement('a');
    amazonLink.className = 'amazon-link'; // Use your existing CSS class
    amazonLink.href = linkUrl;
    amazonLink.target = '_blank';
    amazonLink.rel = 'noopener noreferrer';
    
    // Create the SVG icon using innerHTML
    const basketIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    basketIcon.setAttribute('viewBox', '0 0 48 48');
    basketIcon.setAttribute('width', '20');
    basketIcon.setAttribute('height', '20');
    basketIcon.setAttribute('fill', 'none');
    basketIcon.setAttribute('stroke', 'currentColor');
    basketIcon.setAttribute('stroke-width', '2.4');
    basketIcon.setAttribute('stroke-linecap', 'round');
    basketIcon.setAttribute('stroke-linejoin', 'round');
    basketIcon.innerHTML = `
        <path d="M41.38,19.84H33.52l-7.77-13a2,2,0,0,0-3.5,0l-7.77,13H6.62a3.12,3.12,0,0,0-3,3.93L8,40.08a2.84,2.84,0,0,0,2.74,2.1H37.24A2.84,2.84,0,0,0,40,40.08l4.41-16.31A3.12,3.12,0,0,0,41.38,19.84ZM24,11.84l4.77,8H19.23Z"/>
        <line x1="14.48" y1="19.84" x2="33.52" y2="19.84"/>
        <path d="M31,29.17c.94-.47,2.61-1.1,3.11-.34s-.14,2.58-.78,4"/>
        <path d="M13.69,29.71c1.49,1.46,5.88,3.69,10.55,3.69a12.63,12.63,0,0,0,8.59-3.21"/>
    `;
    // Create the text element
    const linkText = document.createElement('span');
    linkText.textContent = 'Jetzt bei Amazon bestellen';
    // Assemble the link
    amazonLink.appendChild(basketIcon);
    amazonLink.appendChild(linkText);
    amazonRow.appendChild(amazonLink);        
    // Add the new row to the caption box
    caption.appendChild(amazonRow);
    }

    modal.style.display = 'flex';
    // Double requestAnimationFrame ensures the transition plays on display:flex
    requestAnimationFrame(()=> {
    requestAnimationFrame(()=> {
        modal.classList.add('open');
        firstFocusableElement.focus(); // Focus on the close button for accessibility
    });
    });

    document.body.style.overflow = 'hidden';
    modal.setAttribute('aria-hidden','false');

    document.addEventListener('keydown', escHandler);
}

/**
* Closes the modal and resets its content.
*/
function closeModal(){
    modal.classList.remove('open');
    setTimeout(()=> {
        modal.style.display = 'none';
        // Clear content to prevent flickering on next open
        modalImage.src = '';
        modalLink.href = ''; 

        // Find and remove the Amazon link row if it exists
        const existingAmazonRow = modal.querySelector('.amazon-row');
        if (existingAmazonRow) {
        existingAmazonRow.remove();
        }
    }, 260); // Should match the CSS transition duration

    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden','true');
    document.removeEventListener('keydown', escHandler);
}

// --- 4. Event Handlers ---
/**
* This block finds every gallery item and attaches a 'click' event listener.
* (This is the modern replacement for inline 'onclick' attributes.)
*/
const galleryItems = document.querySelectorAll('.image-item');

galleryItems.forEach(item => {
    // Listen for a 'click' event on this item
    item.addEventListener('click', () => {
        // When a click happens, call your existing function and pass the clicked item
        triggerOpenModal(item);
    });

    // We can also add the keyboard functionality here
    item.addEventListener('keypress', (event) => {
        // Check if the key pressed was 'Enter'
        if (event.key === 'Enter') {
            triggerOpenModal(item);
        }
    });
})

/**
 * Closes the modal when the Escape key is pressed.
 * @param {KeyboardEvent} e The keydown event.
 */
function escHandler(e){
    if(e.key === 'Escape') {
    closeModal();
    }
}

// Prevents closing the modal when clicking inside the dialog content
const dialog = document.querySelector('.dialog');
if (dialog) dialog.addEventListener('click', (e) => e.stopPropagation());

// Prevents from downloading images easily
document.addEventListener('contextmenu', e => e.preventDefault());

// Show copyright years
const start = 2025;
const current = new Date().getFullYear()
const text = start === current ? `${current}` : `${start}–${current}`;
document.getElementById('years').textContent = text;
