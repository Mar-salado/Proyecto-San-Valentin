const proposalSection = document.getElementById("proposal");
const memoriesSection = document.getElementById("memories");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noMessage = document.getElementById("noMessage");
const playMusic = document.getElementById("playMusic");
const pauseMusic = document.getElementById("pauseMusic");
const bgMusic = document.getElementById("bgMusic");

const photoGrid = document.getElementById("photoGrid");
const videoGrid = document.getElementById("videoGrid");
const photoTemplate = document.getElementById("photoTemplate");
const videoTemplate = document.getElementById("videoTemplate");

const noMessages = [
  "¿Segura? 🥺",
  "Piénsalo otra vez... prometo hacerte muy feliz 💕",
  "Ese botón no te queda tan bien como el de Sí 😘",
  "Última oportunidad antes de más besitos 😏",
];

const photos = [
  { src: "assets/photos/foto-1.jpg", description: "Nuestro primer recuerdo juntos." },
  { src: "assets/photos/foto-2.jpg", description: "Una cita que jamás olvidaré." },
  { src: "assets/photos/foto-3.jpg", description: "Tu sonrisa en su máxima expresión." },
  { src: "assets/photos/foto-4.jpg", description: "Ese día que todo fue perfecto." },
];

const videos = [
  { src: "assets/videos/video-1.mp4", description: "Una aventura inolvidable." },
  { src: "assets/videos/video-2.mp4", description: "Risas que quiero repetir siempre." },
];

let noClicks = 0;

function renderPhotos() {
  photoGrid.innerHTML = "";

  photos.forEach((photo) => {
    const clone = photoTemplate.content.cloneNode(true);
    const img = clone.querySelector("img");
    const caption = clone.querySelector("p");

    img.src = photo.src;
    img.alt = photo.description;
    img.onerror = () => {
      img.alt = "Sube tus fotos en assets/photos";
    };
    caption.textContent = photo.description;

    photoGrid.appendChild(clone);
  });
}

function renderVideos() {
  videoGrid.innerHTML = "";

  videos.forEach((video) => {
    const clone = videoTemplate.content.cloneNode(true);
    const videoEl = clone.querySelector("video");
    const caption = clone.querySelector("p");

    videoEl.src = video.src;
    caption.textContent = video.description;

    videoGrid.appendChild(clone);
  });
}

function showMemories() {
  proposalSection.classList.remove("active");
  proposalSection.classList.add("hidden");
  memoriesSection.classList.remove("hidden");
  memoriesSection.setAttribute("aria-hidden", "false");

  renderPhotos();
  renderVideos();

  bgMusic.play().catch(() => {
    noMessage.textContent = "Pulsa 'Reproducir canción' para escuchar nuestra música 💕";
  });
}

function moveNoButton() {
  const x = Math.random() * 120 - 60;
  const y = Math.random() * 70 - 35;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

yesBtn.addEventListener("click", showMemories);

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", () => {
  noMessage.textContent = noMessages[noClicks % noMessages.length];
  noClicks += 1;
  moveNoButton();
});

playMusic.addEventListener("click", () => {
  bgMusic.play();
});

pauseMusic.addEventListener("click", () => {
  bgMusic.pause();
});
