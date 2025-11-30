// Music bookmarks with hardcoded YouTube videos
const bookmarks = [
    {
      id: 1,
      title: "Deewaniyat ",
      artist: "Swaraplex ",
      cover: "Images/Cover/Deewaniyat.png",
      youtubeId: "kNGgUjYe3Sw",
      liked: false,
    },
  {
    id: 2,
    title: " Khoobsurat",
    artist: "Swaraplex ",
    cover: "Images/Cover/Khoobsurat.png",
    youtubeId: "wMlQea4-4O0",
    liked: true,
  },
  {
    id: 3,
    title: "Bol Kaffara",
    artist: "Swaraplex ",
    cover: "Images/Cover/Bol Kaffara.png",
    youtubeId: "Uc_TKSUMFjc",
    liked: true,
  },
  {
    id: 4,
    title: "Montagem coma-1 ",
    artist: "Swaraplex ",
    cover: "Images/Cover/Montagem coma-1.png",
    youtubeId: "3iZ_0HF28cQ",
    liked: false,
  },
  {
    id: 5,
    title: "Montagem coma-2 ",
    artist: "Swaraplex ",
    cover: "Images/Cover/Montagem coma-1.png",
    youtubeId: "-DV5_HG4I2o",
    liked: false,
  },
  {
    id: 6,
    title: "PASSO BEM SOLTO",
    artist: "Swaraplex ",
    cover: "Images/Cover/PASSO BEM SOLTO.png",
    youtubeId: "gZ7U3zvj-GM",
    liked: false,
  },
  {
    id: 7,
    title: "Pal Pal",
    artist: "Swaraplex ",
    cover: "Images/Cover/Pal Pal.png",
    youtubeId: "9Qe6pqmgHak",
    liked: false,
  },
  {
    id: 8,
    title: "Sahiba",
    artist: "Swaraplex ",
    cover: "Images/Cover/Sahiba.png",
    youtubeId: "nUfcPEfLmUY",
    liked: false,
  },
  // {
  //   id: 9,
  //   title: "Sanam re",
  //   artist: "Swaraplex ",
  //   cover: "Images/Cover/Sanam re.png",
  //   youtubeId: "nsd-_eXQgmU",
  //   liked: false,
  // },
  // {
  //   id: 10,
  //   title: "Tum Mare",
  //   artist: "Swaraplex ",
  //   cover: "Images/Cover/Tum Mare.png",
  //   youtubeId: "rCpj6ZO_Wew",
  //   liked: false,
  // },
  // {
  //   id: 11,
  //   title: "Sapphire",
  //   artist: "Swaraplex ",
  //   cover: "Images/Cover/Sapphire.png",
  //   youtubeId: "MQg4mjYw138",
  //   liked: false,
  // },

];

// DOM references
const bookmarksList = document.getElementById("bookmarks-list");
const search = document.getElementById("search");
const videoModal = document.getElementById("video-modal");
const videoIframe = document.getElementById("video-iframe");

let currentFilter = "";

// Render bookmark cards
function renderBookmarks(filter = "") {
  currentFilter = filter;
  let html = "";

  const filtered = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(filter.toLowerCase()) ||
      b.artist.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    html = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="color: var(--text-secondary); font-size: 1.1rem;">No songs found 🎵</p>
      </div>
    `;
  } else {
    filtered.forEach((b, index) => {
      html += `
        <div class="bookmark-card" style="animation-delay: ${index * 0.08}s" data-id="${b.id}">
          <img src="${b.cover}" class="album-img" alt="${b.title}"/>
          <div class="bookmark-title">${b.title}</div>
          <div class="bookmark-artist">${b.artist}</div>
          <div class="bookmark-actions">
            <button class="play-btn" title="Play Video" data-id="${b.id}">
              <i class="fas fa-play"></i>
            </button>
          </div>
        </div>
      `;
    });
  }

  bookmarksList.innerHTML = html;

  // Attach event listeners
  document.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", handlePlayVideo);
  });

  document.querySelectorAll(".heart").forEach((icon) => {
    icon.addEventListener("click", handleLike);
  });
}

// Initial render
renderBookmarks();

// Search filter
search.addEventListener("input", (e) => {
  renderBookmarks(e.target.value);
});

// Play video - Open YouTube in modal
function handlePlayVideo(e) {
  const id = +e.currentTarget.closest(".bookmark-card").dataset.id;
  const song = bookmarks.find((b) => b.id === id);

  if (song) {
    const embedUrl = `https://www.youtube.com/embed/${song.youtubeId}?autoplay=1`;
    videoIframe.src = embedUrl;
    videoModal.classList.remove("hidden");
  }
}

// Toggle like
function handleLike(e) {
  const id = +e.target.dataset.id;
  const song = bookmarks.find((b) => b.id === id);

  if (song) {
    song.liked = !song.liked;
    renderBookmarks(currentFilter);
  }
}

// Close modal
function closeModal(modal) {
  modal.classList.add("hidden");
  videoIframe.src = ""; // Stop video
}

// Modal close button
document.querySelector(".modal-close").addEventListener("click", () => {
  closeModal(videoModal);
});

// Close on overlay click
document.querySelector(".modal-overlay").addEventListener("click", () => {
  closeModal(videoModal);
});

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(videoModal);
  }
});
