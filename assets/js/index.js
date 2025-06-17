window.addEventListener("DOMContentLoaded", async function () {
  // 加载JSON数据
  var linkJson = [];
  var musicJson = [];
  var artJson = [];
  await fetch("./assets/data/links.json")
    .then(response => response.json())
    .then(data => {
      linkJson = data["links"];
    });
  await fetch("./assets/data/musics.json")
    .then(response => response.json())
    .then(data => {
      musicJson = data["musics"];
    });
  await fetch("./assets/data/articles.json")
    .then(response => response.json())
    .then(data => {
      artJson = data["articles"];
    });
  // 加载随机背景
  var cnt = Math.ceil(Math.random() * 70);
  var obj = document.getElementById("banner");
  obj.style = "background-image: url('./assets/img/overlay.png'), url('./assets/img/bg/" + cnt + ".jpg')";
  // 动态插入推荐资源
  const rec_src = document.getElementById("rec_src");
  const cardContainer = document.createElement("div");
  cardContainer.className = "link-card-container";
  rec_src.appendChild(cardContainer);
  renderCards(linkJson);
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase().trim();

    if (searchTerm === "") {
      renderCards(linkJson);
      document.getElementById("emptyState").style.display = "none";
      return;
    }
    const filteredLinks = linkJson.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      (new URL(item.link)).hostname.toLowerCase().includes(searchTerm)
    );
    renderCards(filteredLinks);
    if (filteredLinks.length === 0) {
      document.getElementById("emptyState").style.display = "block";
    } else {
      document.getElementById("emptyState").style.display = "none";
    }
  });
  
  function renderCards(links) {
    cardContainer.innerHTML = "";
    links.forEach(item => {
      const card = document.createElement("div");
      card.className = "link-card";
      const domain = (new URL(item.link)).hostname;
      card.innerHTML = `
                    <div class="card-top"></div>
                    <div class="card-content">
                        <a href="${item.link}" target="_blank">
                            <h3 class="res_title">${item.title}</h3>
                            <p class="card-description">${item.description}</p>
                            <div class="card-url">
                                <img src="https://ico.n3v.cn/get.php?url=${domain}" alt="${item.title}" width="16" height="16">
                                &nbsp;${domain}
                            </div>
                        </a>
                    </div>
                `;
      cardContainer.appendChild(card);
    });
  }
  // 动态插入推荐音乐
  let currentPlayingIndex = -1;
  const recMusicDiv = document.getElementById('rec_music');
  renderMusicPlayer();
  function renderMusicPlayer() {
    recMusicDiv.innerHTML = '';
    const visibleSongs = musicJson.filter(song => !song.hidden);
    if (visibleSongs.length === 0) {
      recMusicDiv.innerHTML = '<p style="text-align: center; color: #666;">没有可用的歌曲</p>';
      return;
    }
    visibleSongs.forEach((song, index) => {
      const card = document.createElement('div');
      card.className = 'music-card';
      card.setAttribute('data-index', index);
      card.innerHTML = `
                        <div class="card-content">
                            <div class="song-info">
                                <div class="song-title">${song.title}</div>
                                <div class="song-details">歌手: ${song.artist}</div>
                                <div class="song-details">专辑: ${song.album}</div>
                            </div>
                            <div class="player-controls">
                                <button class="play-pause" data-id="${song.id}">
                                    <i class="play-icon">▶</i>
                                    <i class="pause-icon">⏸</i>
                                </button>
                                <div class="progress-container" data-id="${song.id}">
                                    <div class="progress-bar" style="width: 0%;">
                                        <div class="progress-handle"></div>
                                    </div>
                                </div>
                                <div class="time-info">
                                    <span class="current-time">0:00</span>
                                    <span class="total-time">--:--</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-image">
                            <img src="${song.image}" alt="${song.title}专辑封面">
                            <div class="close-btn" data-id="${song.id}">×</div>
                        </div>
                    `;
      recMusicDiv.appendChild(card);
      const audio = document.createElement('audio');
      audio.src = song.audio;
      audio.id = `audio-${song.id}`;
      audio.preload = 'metadata';
      document.body.appendChild(audio);
      const playPauseBtn = card.querySelector('.play-pause');
      const progressContainer = card.querySelector('.progress-container');
      const closeBtn = card.querySelector('.close-btn');
      const totalTimeEl = card.querySelector('.total-time');
      playPauseBtn.addEventListener('click', function () {
        playOrPauseSong(song.id, index);
      });
      progressContainer.addEventListener('click', function (e) {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const audioEl = document.getElementById(`audio-${song.id}`);
        audioEl.currentTime = pos * audioEl.duration;
        updateProgress(song.id);
      });
      closeBtn.addEventListener('click', function () {
        const songIndex = musicJson.findIndex(s => s.id === song.id);
        if (songIndex !== -1) {
          musicJson[songIndex].hidden = true;
          if (currentPlayingIndex === songIndex) {
            const currentAudio = document.getElementById(`audio-${song.id}`);
            currentAudio.pause();
            currentPlayingIndex = -1;
            updatePlayPauseIcons();
          }
          renderMusicPlayer();
        }
      });
      audio.addEventListener('timeupdate', function () {
        updateProgress(song.id);
        if (audio.currentTime >= audio.duration) {
          if (currentPlayingIndex !== -1) {
            let nextIndex = -1;
            for (let i = currentPlayingIndex + 1; i < musicJson.length; i++) {
              if (!musicJson[i].hidden) {
                nextIndex = i;
                break;
              }
            }
            if (nextIndex === -1) {
              for (let i = 0; i < currentPlayingIndex; i++) {
                if (!musicJson[i].hidden) {
                  nextIndex = i;
                  break;
                }
              }
            }
            if (nextIndex !== -1) {
              playOrPauseSong(musicJson[nextIndex].id, nextIndex);
            }
            else {
              currentPlayingIndex = -1;
              updatePlayPauseIcons();
            }
          }
        }
      });
      audio.addEventListener('loadedmetadata', function () {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        totalTimeEl.textContent = formattedTime;
      });
    });
    updatePlayPauseIcons();
  }
  function playOrPauseSong(songId, index) {
    const audio = document.getElementById(`audio-${songId}`);
    if (currentPlayingIndex !== -1 && currentPlayingIndex !== index) {
      const currentSong = musicJson[currentPlayingIndex];
      const currentAudio = document.getElementById(`audio-${currentSong.id}`);
      currentAudio.pause();
    }
    if (audio.paused) {
      audio.play();
      currentPlayingIndex = index;
    }
    else {
      audio.pause();
      currentPlayingIndex = -1;
    }
    updatePlayPauseIcons();
  }
  function updateProgress(songId) {
    const audio = document.getElementById(`audio-${songId}`);
    const progressBar = document.querySelector(`.progress-container[data-id="${songId}"] .progress-bar`);
    const currentTimeEl = document.querySelector(`.progress-container[data-id="${songId}"] ~ .time-info .current-time`);
    if (audio && progressBar && currentTimeEl) {
      progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }
  function updatePlayPauseIcons() {
    document.querySelectorAll('.play-pause').forEach(btn => {
      const audio = document.getElementById(`audio-${btn.getAttribute('data-id')}`);
      if (audio) {
        const playIcon = btn.querySelector('.play-icon');
        const pauseIcon = btn.querySelector('.pause-icon');
        if (audio.paused) {
          playIcon.style.display = 'block';
          pauseIcon.style.display = 'none';
        }
        else {
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'block';
        }
      }
    });
  }
  // 动态插入推荐文章
  var rec_article = document.getElementById("rec_article");
  artJson.forEach(item => {
    const card = document.createElement("div");
    card.className = "tutorial-card";
    card.innerHTML = `
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="card-meta">
            <span>标签：${item.tags.join("、")}</span><br>
            <span>发布时间：${item.time}</span>
        </div>
        <a href="article.html?title=${item.type}" class="btn-readmore">查看完整文章</a>
    `;
    rec_article.appendChild(card);
  });
  var blogTitle = document.getElementById("blog-title");
  blogTitle.addEventListener("click", function () {
    alert("欢迎来到SweelLong的博客！");
  });
  blogTitle.addEventListener("mouseenter", function () {
    blogTitle.textContent = document.title;
  });
  blogTitle.addEventListener("mouseleave", function () {
    blogTitle.textContent = "SweelLong's blog";
  });
});