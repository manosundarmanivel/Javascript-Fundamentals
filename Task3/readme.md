

![Portfolio Website Preview](assets/output.png)

```js
let images = document.querySelectorAll(".gallery img");
let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img");
let currentIndex = 0;
images → Stores all gallery images.

lightbox → The modal that appears when clicking an image.

lightboxImg → Displays the selected image inside the lightbox.

currentIndex → Tracks the current image index.

Opening the Lightbox
When a thumbnail is clicked:


images.forEach((img, index) => {
    img.addEventListener("click", function () {
        lightbox.style.display = "flex";
        lightboxImg.src = this.src;
        currentIndex = index;
    });
});
Adds an event listener to each image.

When clicked, it sets the lightbox image and updates the current index.

lightbox.style.display = "flex" makes the modal visible.

Closing the Lightbox
Users can close the modal by:

Clicking the close button (X).

Clicking outside the image.

Pressing Escape (Esc) key.

document.getElementById("close-btn").addEventListener("click", function () {
    lightbox.style.display = "none";
});
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) lightbox.style.display = "none";
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") lightbox.style.display = "none";
});
The click event checks if the user clicked outside the image, then closes the modal.

The keydown event listens for the Escape key (Esc) and hides the modal.

Navigating Images (Next & Previous)
Users can navigate left (<) and right (>).


let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");

function updateImage(index) {
    lightboxImg.src = images[index].src;
    currentIndex = index;
}

nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
});

prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex);
});
updateImage(index) → Updates the lightbox with the correct image.

nextBtn → Moves to the next image.

(currentIndex + 1) % images.length ensures it loops back to the first image after the last one.

prevBtn → Moves to the previous image.

(currentIndex - 1 + images.length) % images.length ensures it loops back to the last image when at the first one.

Keyboard Navigation (← & →)
Users can use keyboard arrow keys to switch images.

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") nextBtn.click();
    else if (event.key === "ArrowLeft") prevBtn.click();
});
ArrowRight → Clicks the next button (>).

ArrowLeft → Clicks the previous button (<).

