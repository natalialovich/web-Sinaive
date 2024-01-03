// Loads the IFrame Player API code asynchronously

let tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)

let player;
const videos = ["vKWYBvbiM8Y", "4v6Blr4itQA", "foULVTzG0iA", "eP2bdPNW72Y"];

let isMobile = window.innerWidth < 666;
function onYouTubeIframeAPIReady() {
  let playerHeight = isMobile ? 460 : 720;

  videos.forEach((videoInfo) => {
    const values = videoInfo;
    createYouTubePlayer(values);
  });

  function createYouTubePlayer(videoInfo) {
    console.log(videoInfo);

    player1 = new YT.Player(videoInfo, {
      height: playerHeight,
      width: "100%",
      videoId: videoInfo,
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
}

function onPlayerReady(event) {}

function onPlayerStateChange(event) {}

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
const btnMobile = document.getElementById("vinyl-record");
const discoItem = document.getElementById("disco-nav-item");
const dot = document.querySelector(".dot-nav");

// This code creates a parallax effect on the album items

let scrollStart = window.scrollY;
let parallaxActive = true;

const parallax = () => {
  if (parallaxActive && scrollStart > 860) {
    if (scrollStart < window.scrollY) {
      parallaxBackground.scrollTop += 3;
    } else {
      parallaxBackground.scrollTop -= 3;
    }
    if (!isMobile) {
      if (scrollStart > 1500) {
        discoItem.firstChild.style.color = "#e19e2d";
        discoItem.firstChild.style.textDecoration = "underline";
        dot.style.display = "inline-block";
      } else {
        discoItem.firstChild.style.color = "white";
        discoItem.firstChild.style.textDecoration = "none";
        dot.style.display = "none";
      }
    }
  }
  scrollStart = window.scrollY;
};

if (parallaxBackground) {
  window.addEventListener("scroll", parallax);
}

//Discography element scroll

document.addEventListener("DOMContentLoaded", function () {
  const refPage = document.referrer.split("/").pop();

  if (
    refPage == "videos.html" ||
    refPage == "shop.html" ||
    refPage == "about.html"
  ) {
    parallaxActive = false;
    setTimeout(() => {
      parallaxActive = true;
    }, 1000);
  }
});

function scrollToItem() {
  parallaxActive = false;
  if (isMobile) {
    toggleMenu();
  }
  discoItem.firstChild.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    parallaxActive = true;
  }, 600);
}

discoItem.firstChild.addEventListener("click", scrollToItem);

//Blur navigation on scroll

if (!isMobile) {
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
}

//Mobile menu button

btnMobile.addEventListener("click", toggleMenu);

function toggleMenu() {
  nav.classList.toggle("active-mobile");
}

//Album back covers mouse effect and noise

const backCoverEffect = (e) => {
  noise.style.display = "block";
  const targetImage = e.target;
  const nextSibling = e.target.parentNode.nextElementSibling;

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

  nextSibling.style.visibility = "visible";
};

function mobileAlbum(e) {
  noise.style.display = "block";

  const nextSibling = e.target.parentNode.nextElementSibling;
  const targetImage = e.target;

  const targetRect = targetImage.getBoundingClientRect();

  const targetCenterX = targetRect.left + targetRect.width / 10;
  const targetCenterY = targetRect.top + targetRect.height / 10;

  const siblingCenterX = targetCenterX;
  const siblingCenterY = targetCenterY;

  nextSibling.style.width = "250px";
  nextSibling.style.left = siblingCenterX + "px";
  nextSibling.style.top = siblingCenterY + "px";

  nextSibling.style.visibility = "visible";
}

albumCovers.forEach((albumCover) => {
  if (!navigator.maxTouchPoints > 0) {
    albumCover.addEventListener("mousemove", backCoverEffect);
    albumCover.addEventListener("mouseleave", (e) => {
      const nextSibling = e.target.parentNode.nextElementSibling;
      if (nextSibling) {
        nextSibling.style.visibility = "hidden";
        noise.style.display = "none";
      }
    });
  } else {
    albumCover.addEventListener("touchstart", mobileAlbum);
    albumCover.addEventListener("touchend", (e) => {
      const nextSibling = e.target.parentNode.nextElementSibling;
      if (nextSibling) {
        nextSibling.style.visibility = "hidden";
        noise.style.display = "none";
      }
    });
  }
});
