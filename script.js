const slides = [
  {
    title: "Welcome",
    description: "A welcome slide with an introduction to the presentation.",
    src: "slide1.html",
  },
  {
    title: "Goals",
    description: "Describe the objectives and structure of the deck.",
    src: "slide2.html",
  },
  {
    title: "Example Page",
    description: "Embed an external website directly in the slide frame.",
    src: "https://www.example.com",
  },
  {
    title: "Web Standards",
    description: "View a public website as part of the presentation.",
    src: "https://www.w3.org",
  },
  {
    title: "Summary",
    description: "A final wrap-up slide inside the iframe.",
    src: "slide3.html",
  },
];

const slideList = document.getElementById("slideList");
const slideTitle = document.getElementById("slideTitle");
const slideDescription = document.getElementById("slideDescription");
const slideFrame = document.getElementById("slideFrame");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

function renderSlideList() {
  slideList.innerHTML = "";
  slides.forEach((slide, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "slide-item";
    item.dataset.index = index;
    item.innerHTML = `
      <div class="slide-item-title">${index + 1}. ${slide.title}</div>
      <p class="slide-item-caption">${slide.description}</p>
    `;
    item.addEventListener("click", () => selectSlide(index));
    slideList.appendChild(item);
  });
}

function updateNavigation() {
  const items = slideList.querySelectorAll(".slide-item");
  items.forEach((item) => {
    item.classList.toggle("active", Number(item.dataset.index) === currentIndex);
  });

  const currentSlide = slides[currentIndex];
  slideTitle.textContent = currentSlide.title;
  slideDescription.textContent = currentSlide.description;
  slideFrame.src = currentSlide.src;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slides.length - 1;
}

function selectSlide(index) {
  currentIndex = index;
  updateNavigation();
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    selectSlide(currentIndex - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < slides.length - 1) {
    selectSlide(currentIndex + 1);
  }
});

renderSlideList();
updateNavigation();
