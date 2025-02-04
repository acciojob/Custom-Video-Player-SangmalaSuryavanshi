// Get references to the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play/Pause button functionality
toggle.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        toggle.textContent = '❚❚'; // Change button to pause icon
    } else {
        video.pause();
        toggle.textContent = '►'; // Change button to play icon
    }
});

// Update progress bar as the video plays
video.addEventListener('timeupdate', () => {
    const progressPercent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
});

// Click on the progress bar to seek a specific time in the video
progress.addEventListener('click', (e) => {
    const progressBarWidth = progress.offsetWidth;
    const clickPosition = e.offsetX;
    const newTime = (clickPosition / progressBarWidth) * video.duration;
    video.currentTime = newTime;
});

// Skip buttons functionality (Rewind or Forward)
skipButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const skipTime = parseFloat(e.target.dataset.skip);
        video.currentTime += skipTime;
    });
});

// Handle volume and playback rate sliders
ranges.forEach(range => {
    range.addEventListener('input', (e) => {
        const { name, value } = e.target;
        
        if (name === 'volume') {
            video.volume = value; // Adjust video volume
        } else if (name === 'playbackRate') {
            video.playbackRate = value; // Adjust video playback speed
        }
    });
});
