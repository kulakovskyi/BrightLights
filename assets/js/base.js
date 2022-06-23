//burger menu

const iconMenu = document.querySelector(".menu__icon");
const iconMenuSpan = document.querySelector(".menu__icon > span");
const menuBody = document.querySelector(".header__menu");
const boby = document.querySelector("body");

iconMenu.addEventListener("click", function (e) {
  iconMenu.classList.toggle("_active");
  menuBody.classList.toggle("_active");
  boby.classList.toggle("_lock");
  // заекрытие меню по клику на любую область
  // дополниельно делаем проверку клик по спану, что бы отрабатывало закрытие
  window.onclick = function (e) {
    if (e.target !== menuBody && e.target !== iconMenu && e.target !== iconMenuSpan) {
      menuBody.classList.remove("_active");
      iconMenu.classList.remove("_active");
    }
  };
});

//плеер на стартовой странице
const player = document.querySelector(".single__music");
const playBtn = document.querySelector(".music__button");
const audio = document.querySelector(".audio");
const progress = document.querySelector(".music__progressbar");
const progressDone = document.querySelector(".progressbar__done");

//constant for timer
const timeIn = document.querySelector(".time__in");
const timeAll = document.querySelector(".time__all");

function playSong() {
  player.classList.add("play");
  playBtn.classList.add("_pause");
  audio.play();
}

function pauseSong() {
  player.classList.remove("play");
  playBtn.classList.remove("_pause");
  audio.pause();
}

playBtn.addEventListener("click", () => {
  let isPlaing = player.classList.contains("play");
  !isPlaing ? playSong() : pauseSong();
});

//ProgressBar

function updateProgress(e) {
  //duration - длительнность песни
  //currentTime - текущее е' время
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progressDone.style.width = `${progressPercent}%`;

  minutesPrepros(currentTime, timeIn);
}

audio.addEventListener("timeupdate", updateProgress);

//save and set progress

function setProgress(e) {
  //ширина всего прогресс бара
  const width = this.clientWidth;
  //ширина от начала до точки клика по прогрессбару
  const clickX = e.offsetX;
  //длина трека
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progress.addEventListener("click", setProgress);

//timer
audio.onloadedmetadata = function () {
  let duration = Math.floor(this.duration);
  let currTime = Math.floor(this.currentTime);
  minutesPrepros(duration, timeAll);
  minutesPrepros(currTime, timeIn);
};

//функция перевода секунд в минуты
function minutesPrepros(secund, elem) {
  let minutes = Math.floor(secund / 60).toString();
  let seconds = Math.floor(secund % 60).toString();
  //padStart добавляет нули в начало
  let formatted = minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
  elem.innerHTML = formatted;
}

//player on tracks

const playerTracks = document.querySelector(".tracks__music");
const playBtnTracks = document.querySelector(".music__button__2");
const audioTracks = document.querySelector(".audio-list");
const progressTracks = document.querySelector(".music__progressbar__2");
const progressDoneTracks = document.querySelector(".progressbar__done__2");

//constant for timer
const timeInTracks = document.querySelector(".time__in__2");
const timeAllTracks = document.querySelector(".time__all__2");

//array songs
const songs = ["one", "two", "three", "fourth", "five", "six"];

//песня по умолчанию
let songIndex = 0;

function loadSong(song) {
  audioTracks.src = `assets/music/${song}.mp3`;
}

//all somgs buttons
const songBtn = document.querySelectorAll(".tracks__item");
const songButtonContainer = document.querySelector(".tracks__info");

//функция автоматической перемотки по окончанию
function nextSong() {
  //проверяем не закончились ли у нас треки
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  songIndex++;
  playSongTracks();

  songBtn.forEach((item) => {
    item.classList.remove("_active");
    //меняем класс у кнопки при переулючении песни
    if (item.dataset.songCount == songIndex) {
      item.classList.add("_active");
    }
  });
}

songButtonContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    songBtn.forEach((item) => {
      item.classList.remove("_active");
    });
    e.target.classList.add("_active");
    let count = Number(e.target.dataset.songCount) + 1;

    songIndex = e.target.dataset.songCount;
    loadSong(songs[songIndex - 1]);
    playSongTracks();
  }
});

audioTracks.addEventListener("ended", nextSong);

//функции для прокрутки и остановки

function playSongTracks() {
  playerTracks.classList.add("play-2");
  playBtnTracks.classList.add("_pause");
  audioTracks.play();
}

function pauseSongTracks() {
  playerTracks.classList.remove("play-2");
  playBtnTracks.classList.remove("_pause");
  audioTracks.pause();
}

playBtnTracks.addEventListener("click", () => {
  let isPlaing = playerTracks.classList.contains("play-2");
  !isPlaing ? playSongTracks() : pauseSongTracks();
});

//ProgressBar

function updateProgressTracks(e) {
  //duration - длительнность песни
  //currentTime - текущее е' время
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progressDoneTracks.style.width = `${progressPercent}%`;

  minutesPrepros(currentTime, timeInTracks);
}

audioTracks.addEventListener("timeupdate", updateProgressTracks);

//save and set progress

function setProgressTracks(e) {
  //ширина всего прогресс бара
  const width = this.clientWidth;
  //ширина от начала до точки клика по прогрессбару
  const clickX = e.offsetX;
  //длина трека
  const duration = audioTracks.duration;
  audioTracks.currentTime = (clickX / width) * duration;
}

progressTracks.addEventListener("click", setProgressTracks);

//timer
audioTracks.onloadedmetadata = function () {
  let duration = Math.floor(this.duration);
  let currTime = Math.floor(this.currentTime);
  minutesPrepros(duration, timeAllTracks);
  minutesPrepros(currTime, timeInTracks);
};

//swiper on tickets block

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 3,
  spaceBetween: 28,
  autoplay: {
    delay: 3000,
    speed: 1000,
  },

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 35,
    },

    750: {
      slidesPerView: 2,
      spaceBetween: 35,
    },
    // when window width is >= 480px
    1202: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
