document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.querySelector(".slides-container");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  let isDragging = false;
  let startPositionX = 0;

  function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      currentIndex = i;
    });
  });

  // Touch slider functionality
  let touchStartX = 0;
  let touchEndX = 0;

  slidesContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slidesContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    if (touchEndX - touchStartX > 50) {
      prevSlide();
    } else if (touchStartX - touchEndX > 50) {
      nextSlide();
    }
  });

  // Mouse slider functionality
  slidesContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPositionX = e.clientX;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPositionX;
    if (deltaX > 50) {
      prevSlide();
      isDragging = false;
    } else if (deltaX < -50) {
      nextSlide();
      isDragging = false;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  showSlide(currentIndex);
});
