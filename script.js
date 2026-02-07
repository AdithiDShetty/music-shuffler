const fileInput = document.getElementById("fileInput");
const selectBtn = document.getElementById("selectBtn");
const changeFolderBtn = document.getElementById("changeFolderBtn");

const uploadCard = document.getElementById("uploadCard");
const playerCard = document.getElementById("playerCard");
const queueSection = document.getElementById("queueSection");
const playlistSection = document.getElementById("playlistSection");

const audio = document.getElementById("audio");
const playPause = document.getElementById("playPause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const trackName = document.getElementById("trackName");
const playlistEl = document.getElementById("playlist");
const upNextEl = document.getElementById("upNext");

const seekBar = document.getElementById("seekBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let tracks = [];
let playOrder = [];
let currentIndex = 0;

let shuffleEnabled = true;
let repeatMode = "off"; // off | one | all

selectBtn.onclick = changeFolderBtn.onclick = () => fileInput.click();

fileInput.onchange = () => {
  tracks = [...fileInput.files].filter(f => f.type.startsWith("audio/"));
  if (!tracks.length) return;

  uploadCard.classList.add("hidden");
  playerCard.classList.remove("hidden");
  queueSection.classList.remove("hidden");
  playlistSection.classList.remove("hidden");
  changeFolderBtn.classList.remove("hidden");

  rebuildQueue();
  renderPlaylist();
  playFromQueue(0);
};

function rebuildQueue(startTrack = null) {
  let base = [...tracks];

  if (shuffleEnabled) {
    if (startTrack) base = base.filter(t => t !== startTrack);
    for (let i = base.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    playOrder = startTrack ? [startTrack, ...base] : base;
  } else {
    playOrder = base;
  }

  currentIndex = startTrack ? 0 : currentIndex;
  updateUpNext();
}

function playFromQueue(index) {
  currentIndex = index;
  const track = playOrder[currentIndex];
  audio.src = URL.createObjectURL(track);
  audio.play();
  playPause.textContent = "⏸";
  trackName.textContent = track.name;
  updatePlaylistUI(track);
  updateUpNext();
}

function playNext() {
  if (repeatMode === "one") {
    audio.currentTime = 0;
    audio.play();
    return;
  }

  currentIndex++;
  if (currentIndex >= playOrder.length) {
    if (repeatMode === "all") {
      rebuildQueue();
      currentIndex = 0;
    } else {
      audio.pause();
      return;
    }
  }
  playFromQueue(currentIndex);
}

playPause.onclick = () => {
  if (audio.paused) {
    audio.play();
    playPause.textContent = "⏸";
  } else {
    audio.pause();
    playPause.textContent = "▶";
  }
};

nextBtn.onclick = playNext;
prevBtn.onclick = () => currentIndex > 0 && playFromQueue(--currentIndex);
audio.onended = playNext;

shuffleBtn.onclick = () => {
  shuffleEnabled = !shuffleEnabled;
  shuffleBtn.classList.toggle("active", shuffleEnabled);
  rebuildQueue(playOrder[currentIndex]);
};

repeatBtn.onclick = () => {
  repeatMode = repeatMode === "off" ? "one" : repeatMode === "one" ? "all" : "off";
  repeatBtn.textContent = repeatMode === "one" ? "🔂" : "🔁";
};

function renderPlaylist() {
  playlistEl.innerHTML = "";
  tracks.forEach(track => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.onclick = () => {
      rebuildQueue(track);
      playFromQueue(0);
    };
    playlistEl.appendChild(li);
  });
}

function updatePlaylistUI(currentTrack) {
  [...playlistEl.children].forEach(li =>
    li.classList.toggle("active", li.textContent === currentTrack.name)
  );
}

function updateUpNext() {
  upNextEl.innerHTML = "";
  playOrder.slice(currentIndex + 1, currentIndex + 6).forEach(track => {
    const li = document.createElement("li");
    li.textContent = track.name;
    upNextEl.appendChild(li);
  });
}

/* SEEK */
audio.onloadedmetadata = () => {
  seekBar.max = Math.floor(audio.duration);
  durationEl.textContent = formatTime(audio.duration);
};

audio.ontimeupdate = () => {
  seekBar.value = Math.floor(audio.currentTime);
  currentTimeEl.textContent = formatTime(audio.currentTime);
};

seekBar.oninput = () => audio.currentTime = seekBar.value;

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
