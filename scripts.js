// async function fetchYTData(){
//   const API_KEY = 'AIzaSyD8PR_Fvzhaw2KeExiT_MstQPNZre96frs';
//   const API_URL = 'https://www.googleapis.com/youtube/v3';

//   const response = await fetch( `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCw2yAkSJqcJ3poiZEkSQK2A&key=${API_KEY}`

//   );

//   const data = await response.json();
//   console.log(data)

//   return data

// }
// fetchYTData();
// let videos = '';

// Loads the IFrame Player API code asynchronously

let tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "720",
    width: "1280",
    videoId: "vKWYBvbiM8Y",
    playerVars: {
      controls: 0,
      rel: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  player.mute();
}

// let done = false;

function onPlayerStateChange(event) {
  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   done = true;
  //
}

function stopVideo() {
  player.stopVideo();
}

// This code creates a parallax effect on the album items

const parallaxBackground = document.querySelector("#parallax");
const albums = document.querySelector(".albums");

const parallax = function (e) {};

let scrollStart = window.scrollY;

const doThis = () => {
  if (scrollStart > 860) {
    if (scrollStart < window.scrollY) {
      parallaxBackground.scrollTop += 3;
    } else {
      parallaxBackground.scrollTop -= 3;
    }
  }
  scrollStart = window.scrollY;
};

if (parallaxBackground) {
  parallaxBackground.addEventListener("scroll", parallax);
  window.addEventListener("scroll", doThis);
}

//change logo size depending on the page

if (window.location.pathname !== "/index.html") {
  const logo = document.querySelector(".logo p");
  logo.style.fontSize = "7cqw";
  logo.style.margin = "0 4% 4% 4%";
}

console.log(window.location.pathname);

//About section shorten height

if (window.location.pathname === "/About.html") {
  const container = document.querySelector(".container");
  container.style.minHeight = "auto";
}

//blur navigation on scroll

const menu = document.querySelector(".menu");
const navItems = document.querySelectorAll(".nav-item");
const blurItems = document.querySelectorAll(".blur");

window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  const scrollPosition = window.scrollY;
  const padding = 10;
  const contrast = Math.max(100, scrollPosition / 9);
  const blur = Math.min(4, scrollPosition / 400);

  let value = Math.max(1, padding - (scrollPosition / 100).toFixed(2));

  nav.style.backdropFilter = `blur(${blur}px) grayscale(75%) contrast(${contrast}%)`;
  nav.style.paddingTop = `${value}px`;
  nav.style.paddingBottom = `${value}px`;
  menu.style.paddingTop = `${value}px`;
  menu.style.paddingBottom = `${value}px`;

  navItems.forEach((navItem) => {
    navItem.style.paddingTop = `${value}px`;
    navItem.style.paddingBottom = `${value}px`;
  });
});
