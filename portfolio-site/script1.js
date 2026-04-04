const container = document.getElementById('modal-container');
const modals = document.querySelectorAll('.modal-content');

const isMobile = () => window.innerWidth <= 768;

function openModal(id) {
    container.classList.remove('hidden');
    setTimeout(() => container.classList.remove('opacity-0'), 10);
    modals.forEach(m => {
        m.classList.add('hidden');
        m.classList.remove('open');
    });

    const t = document.getElementById(id);
    if (!t) return;

    t.classList.remove('hidden');

    if (isMobile()) {
        // Zoom the scene back, sheet slides up
        document.getElementById('scene').classList.add('zoomed');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => t.classList.add('open'));
        });
    }
}

function closeModals() {
    if (isMobile()) {
        document.getElementById('scene').classList.remove('zoomed');
        modals.forEach(m => m.classList.remove('open'));
        // Wait for slide-down to finish before hiding
        setTimeout(() => {
            modals.forEach(m => m.classList.add('hidden'));
            container.classList.add('opacity-0');
            setTimeout(() => container.classList.add('hidden'), 300);
        }, 450);
    } else {
        container.classList.add('opacity-0');
        modals.forEach(m => m.classList.add('hidden'));
        setTimeout(() => container.classList.add('hidden'), 500);
    }
}
container.addEventListener('click', e => { if (e.target === container) closeModals(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !container.classList.contains('hidden')) closeModals(); });

let isDarkMode = false;

// Audio Player Logic
const audio = document.getElementById('speaker-audio');
const audioTooltip = document.getElementById('audio-tooltip');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const statusText = document.getElementById('audio-status-text');
const visualizer = document.getElementById('audio-visualizer');
let isPlaying = false;

function toggleAudio() {
    const waves = document.getElementById('speaker-waves');
    const btn = document.getElementById('modal-play-btn');

    if (isPlaying) {
        audio.pause();
        if (btn) btn.textContent = '⏵';
        waves.classList.remove('opacity-100');
        waves.classList.add('opacity-0');
    } else {
        audio.play();
        if (btn) btn.textContent = '⏸';
        waves.classList.remove('opacity-0');
        waves.classList.add('opacity-100');
    }
    isPlaying = !isPlaying;
}

// Progress bar
audio.addEventListener('timeupdate', () => {
    const fill = document.getElementById('song-fill');
    if (!fill || !audio.duration) return;
    fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
});

function seekBack() {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
}

function seekForward() {
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
}


function toggleLight() {
    isDarkMode = !isDarkMode;

    // The multiply overlay handles the deep room shadows
    const darkLayer = document.getElementById('l-dark');
    if (darkLayer) darkLayer.style.opacity = isDarkMode ? '0.92' : '0';

    // The screen overlay handles the tiny point-source LEDs and bright screen emission
    const lightSources = document.getElementById('l-emitters');
    if (lightSources) lightSources.style.opacity = isDarkMode ? '1' : '0';
}


// Swipe down to close on mobile
let touchStartY = 0;
document.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
});
document.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientY - touchStartY;
    if (delta > 80 && !container.classList.contains('hidden')) {
        closeModals();
    }
});