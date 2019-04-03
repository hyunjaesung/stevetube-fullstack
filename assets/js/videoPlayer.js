const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = videoContainer.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // 아이콘바꾸기
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
}

// js파일이 항상 모든페이지 footer아래 include되는걸 명심!
// 이벤트리스너를 이용했을때 해당 id 못찾으면 null이되서 에러냄

if (videoContainer) {
  init();
}
