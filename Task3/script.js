
let images = document.querySelectorAll(".gallery img");
let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img");
let closeBtn = document.getElementById("close-btn");
let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");

let currentIndex = 0;


images.forEach((img, index) => {
    img.addEventListener("click", function () {
        lightbox.style.display = "flex";
        lightboxImg.src = this.src;
        currentIndex = index;
    });
});


closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
});
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});


nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
});


prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
});


document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        lightbox.style.display = "none";
    } else if (event.key === "ArrowRight") {
        nextBtn.click();
    } else if (event.key === "ArrowLeft") {
        prevBtn.click();
    }
});
