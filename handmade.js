const items = document.querySelectorAll(".handmade-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDescription = document.getElementById("lightboxDescription");
const lightboxNumber = document.getElementById("lightboxNumber");

const closeButton = document.getElementById("lightboxClose");
const prevButton = document.getElementById("lightboxPrev");
const nextButton = document.getElementById("lightboxNext");

let currentIndex = 0;


/* SCROLL REVEAL */

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

items.forEach((item) => {
    observer.observe(item);
});


/* OPEN LIGHTBOX */

function openLightbox(index) {
    const item = items[index];
    const image = item.querySelector("img");

    currentIndex = index;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = item.dataset.title;
    lightboxDescription.textContent = item.dataset.description;

    lightboxNumber.textContent =
        String(index + 1).padStart(2, "0") +
        " / " +
        String(items.length).padStart(2, "0");

    lightbox.classList.add("active");

    document.body.classList.add("no-scroll");
}


/* CLOSE LIGHTBOX */

function closeLightbox() {
    lightbox.classList.remove("active");

    document.body.classList.remove("no-scroll");
}


/* NEXT IMAGE */

function showNext() {
    currentIndex++;

    if (currentIndex >= items.length) {
        currentIndex = 0;
    }

    openLightbox(currentIndex);
}


/* PREVIOUS IMAGE */

function showPrevious() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = items.length - 1;
    }

    openLightbox(currentIndex);
}


/* CLICK PHOTO */

items.forEach((item, index) => {

    const imageWrap = item.querySelector(".image-wrap");

    imageWrap.addEventListener("click", () => {
        openLightbox(index);
    });

});


/* BUTTONS */

closeButton.addEventListener("click", closeLightbox);

nextButton.addEventListener("click", showNext);

prevButton.addEventListener("click", showPrevious);


/* CLICK OUTSIDE IMAGE */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* KEYBOARD */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNext();
    }

    if (event.key === "ArrowLeft") {
        showPrevious();
    }

});

