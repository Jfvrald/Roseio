const tracks = [
    { title: "Sining", artist: "Dionela feat Jay R", src: "track1.mp3", cover: "rose1.png", bg: "bg1.png", color: "#C28F46" },
    { title: "Diwata", artist: "Abra ft. Chito Miranda", src: "track2.mp3", cover: "rose2.png", bg: "bg2.png", color: "#9102ca" },
    { title: "Larawan", artist: "JRoa ft. Flow G", src: "track3.mp3", cover: "rose3.png", bg: "bg3.png", color: "#2B26C1" },
    { title: "Scorpions", artist: "Always Somewhere", src: "track4.mp3", cover: "rose4.png", bg: "bg4.png", color: "#E36B25" },
    { title: "I'll Always Love You ", artist: "Michael Johnson", src: "track5.mp3", cover: "rose5.png", bg: "bg5.png", color: "#2C4B88" },

    
];

let currentTrackIndex = 0;
let isPlaying = false; // Track whether the audio is currently playing
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('playPauseButton');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const currentTimeElem = document.getElementById('currentTime');
const totalTimeElem = document.getElementById('totalTime');
const innerSliderBar = document.querySelector('.inner_slider_bar');
const albumCover = document.getElementById('albumCover');
const player = document.querySelector('.player');

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
    albumCover.src = track.cover;
    document.body.style.backgroundImage = `url(${track.bg})`; // Change background image
    player.style.borderColor = track.color; // Change border color
    player.style.boxShadow = `-7px -6px 10px 5px ${track.color}1c, 6px 6px 10px 5px ${track.color}1c`; // Change shadow color

    updateSlider();

    if (isPlaying) {
        audio.play();
        playPauseButton.textContent = 'Pause';
        albumCover.classList.add('rotating');
    } else {
        playPauseButton.textContent = 'Play';
        albumCover.classList.remove('rotating');
    }
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
        albumCover.classList.add('rotating');
        isPlaying = true;
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
        albumCover.classList.remove('rotating');
        isPlaying = false;
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
}

function updateSlider() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;

    if (duration) {
        const percentage = (currentTime / duration) * 100;
        innerSliderBar.style.width = percentage + '%';

        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeElem.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        totalTimeElem.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    }
}

function setTime(event) {
    const sliderBar = event.currentTarget;
    const rect = sliderBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / sliderBar.clientWidth);
    audio.currentTime = percentage * audio.duration;
}

// Initialize with the first track
window.addEventListener('load', () => {
    loadTrack(currentTrackIndex);
});

audio.addEventListener('timeupdate', updateSlider);

// Add this event listener for when the song ends
audio.addEventListener('ended', () => {
    nextTrack();
    if (isPlaying) {
        audio.play(); // Ensure the next track starts playing if needed
    }
});

// Ensure the play/pause button is properly handled
playPauseButton.addEventListener('click', () => {
    if (audio.paused && audio.currentTime === 0) {
        // If the track is at the start, play it
        audio.play();
        playPauseButton.textContent = 'Pause';
        albumCover.classList.add('rotating');
        isPlaying = true;
    } else {
        togglePlayPause();
    }
});

document.getElementById('nextButton').addEventListener('click', nextTrack);
document.getElementById('prevButton').addEventListener('click', prevTrack);

const slider = document.querySelector('.slider_bar');
slider.addEventListener('click', setTime);
