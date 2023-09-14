import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);
const localStorageKey = 'videoplayer-current-time';

let currentTime = localStorage.getItem(localStorageKey);
if (currentTime !== null) {
  iframePlayer.setCurrentTime(currentTime);
}

iframePlayer.setVolume(0);

iframePlayer.on('timeupdate', throttle(timeVideo, 1000));

function timeVideo(event) {
  localStorage.setItem(localStorageKey, event.seconds);
}
