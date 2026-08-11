const toggleButton = document.getElementById("themeToggle");

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    toggleButton.textContent = isDark ? "Light mode" : "Dark mode";
    toggleButton.setAttribute("aria-pressed", String(isDark));
  });
}


const matches = [
  { date: "Jan 9", opponent: "Lakeland University", location: "Neutral", result: "L 0-3", conference: false },
  { date: "Jan 9", opponent: "Trine University", location: "Away", result: "L 0-3", conference: false },
  { date: "Jan 23", opponent: "Saint Vincent College", location: "Away", result: "L 0-3", conference: false },
  { date: "Jan 24", opponent: "Bethany College", location: "Away", result: "W 3-0", conference: false },
  { date: "Jan 31", opponent: "Greenville University", location: "Home", result: "W 3-0", conference: false },
  { date: "Jan 31", opponent: "Franklin College", location: "Home", result: "W 3-1", conference: false },
  { date: "Feb 19", opponent: "Trine University", location: "Home", result: "L 1-3", conference: true },
  { date: "Feb 20", opponent: "Calvin University", location: "Home", result: "L 0-3", conference: true },
  { date: "Mar 3", opponent: "Wittenberg University", location: "Away", result: "L 0-3", conference: true },
  { date: "Mar 4", opponent: "Franklin College", location: "Away", result: "L 2-3", conference: false },
  { date: "Mar 9", opponent: "Yeshiva University", location: "Away", result: "W 3-0", conference: false },
  { date: "Mar 10", opponent: "The College at Old Westbury", location: "Away", result: "W 3-0", conference: false },
  { date: "Mar 12", opponent: "John Jay College", location: "Away", result: "L 2-3", conference: false },
  { date: "Mar 20", opponent: "The University of Olivet", location: "Away", result: "W 3-0", conference: true },
  { date: "Mar 21", opponent: "Adrian College", location: "Away", result: "L 0-3", conference: true },
  { date: "Mar 27", opponent: "Baldwin Wallace University", location: "Home", result: "L 0-3", conference: true },
  { date: "Mar 28", opponent: "University of Mount Union", location: "Home", result: "L 1-3", conference: true },
  { date: "Apr 2", opponent: "Wabash College", location: "Away", result: "L 0-3", conference: true },
  { date: "Apr 3", opponent: "Spalding University (Ky.)", location: "Away", result: "L 2-3", conference: true }
];


const scheduleList = document.getElementById("scheduleList");
const filterButtons = document.querySelectorAll(".filter-button");
const matchCount = document.getElementById("matchCount");
const emptyState = document.getElementById("emptyState");

function renderSchedule(filter = "all") {
  if (!scheduleList) return;

  const filteredMatches = matches.filter((match) => {
    if (filter === "all" || filter === "completed") return true;
    if (filter === "mcvl") return match.conference;
    return match.location.toLowerCase() === filter;
  });

  scheduleList.innerHTML = filteredMatches.map((match) => {
    const resultClass = match.result.startsWith("W") ? "win" : "loss";
    const conferenceBadge = match.conference
      ? '<span class="conference-badge">MCVL</span>'
      : "";

    return `<article class="match-card">
      <time class="match-date">
        ${match.date}
        <span>2026</span>
      </time>

      <div class="match-details">
        <p class="match-status">Final</p>
        <h3>vs. ${match.opponent}</h3>
        <span class="location-badge ${match.location.toLowerCase()}">
          ${match.location}
        </span>
        ${conferenceBadge}
      </div>

      <strong class="match-result ${resultClass}">
        ${match.result}
      </strong>
    </article>`;
  }).join("");

  matchCount.textContent =
    `${filteredMatches.length} match${filteredMatches.length === 1 ? "" : "es"} shown`;

  emptyState.hidden = filteredMatches.length !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("is-selected");
    });

    button.classList.add("is-selected");
    renderSchedule(button.dataset.filter);
  });
});

renderSchedule();


/* Action Gallery */

const actionShots = [
  "action/MSJ-500.jpg",
  "action/MSJ-505.jpg",
  "action/MSJ-506.jpg",
  "action/MSJ-512.jpg",
  "action/MSJ-518.jpg",
  "action/MSJ-522.jpg",
  "action/MSJ-535.jpg",
  "action/MSJ-551.jpg",
  "action/MSJ-552.jpg",
  "action/MSJ-563.jpg",
  "action/MSJ-585.jpg",
  "action/MSJ-611.jpg",
  "action/MSJ-656.jpg",
  "action/MSJ-669.jpg",
  "action/MSJ-705.jpg",
  "action/MSJ-727.jpg",
  "action/MSJ-747.jpg",
  "action/MSJ-751.jpg",
  "action/MSJ-779.jpg"
];

const galleryImage = document.getElementById("action-gallery-image");
const previousButton = document.getElementById("gallery-prev");
const nextButton = document.getElementById("gallery-next");

let currentImage = 0;

function showImage(index) {
  currentImage = (index + actionShots.length) % actionShots.length;

  galleryImage.style.opacity = "0";

  setTimeout(() => {
    galleryImage.src = actionShots[currentImage];
    galleryImage.style.opacity = "1";
  }, 250);
}

function nextImage() {
  showImage(currentImage + 1);
}

function previousImage() {
  showImage(currentImage - 1);
}

if (galleryImage && previousButton && nextButton) {
  nextButton.addEventListener("click", nextImage);
  previousButton.addEventListener("click", previousImage);

  setInterval(nextImage, 5000);
}
