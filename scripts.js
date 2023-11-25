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

const parallaxBackground = document.querySelector("#parallax");
const albumCovers = document.querySelectorAll(".album-cover");
const noise = document.getElementById("noise");
const menu = document.querySelector(".menu");
const navItems = document.querySelectorAll(".nav-item");
const nav = document.querySelector("nav");
const logo = document.querySelector(".logo p");
const container = document.querySelector(".container");

// This code creates a parallax effect on the album items

let scrollStart = window.scrollY;

const parallax = () => {
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
  window.addEventListener("scroll", parallax);
}

//change logo size depending on the page

if (window.location.pathname !== "/index.html") {
  logo.style.fontSize = "7cqw";
  logo.style.margin = "0 4% 4% 4%";
}

//About section shorten height

if (window.location.pathname === "/About.html") {
  container.style.minHeight = "auto";
}

//Blur navigation on scroll

window.addEventListener("scroll", function () {
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

//Album back covers mouse effect and noise

const backCoverEffect = (e) => {
  noise.style.display = "block";
  const targetImage = e.target;
  const nextSibling = e.target.nextElementSibling;

  const targetRect = targetImage.getBoundingClientRect();
  const siblingRect = nextSibling.getBoundingClientRect();

  const targetCenterX = targetRect.left + targetRect.width / 2;
  const targetCenterY = targetRect.top + targetRect.height / 2;

  const mouseY = e.clientY;
  const mouseX = e.clientX;

  const offsetX = mouseX - targetCenterX;
  const offsetY = mouseY - targetCenterY;

  const moveX = -offsetX * 0.1;
  const moveY = -offsetY * 0.1;

  const siblingCenterX = targetCenterX - siblingRect.width / 2 + moveX;
  const siblingCenterY = targetCenterY - siblingRect.height / 2 + moveY;

  nextSibling.style.left = siblingCenterX + "px";
  nextSibling.style.top = siblingCenterY + "px";

  if (nextSibling) {
    if (nextSibling.style.visibility !== "visible") {
      nextSibling.style.visibility = "visible";
    }
  }
};

albumCovers.forEach((albumCover) => {
  albumCover.addEventListener("mousemove", backCoverEffect);
  albumCover.addEventListener("mouseleave", (e) => {
    const nextSibling = e.target.nextElementSibling;
    if (nextSibling) {
      nextSibling.style.visibility = "hidden";
      noise.style.display = "none";
    }
  });
});
