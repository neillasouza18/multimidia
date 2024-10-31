const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPause');
const muteBtn = document.getElementById('mute');
const volumeControl = document.getElementById('volumeControl');
const timeControl = document.getElementById('timeControl');
const videoList = document.getElementById('videoList');

// Lista de vídeos e seus detalhes
const videos = [
    { title: 'Vídeo 1', src: 'videos/video1.mp4', poster: 'videos/thumb1.jpg', description: 'Descrição do Vídeo 1' },
    { title: 'Vídeo 2', src: 'videos/video2.mp4', poster: 'videos/thumb2.jpg', description: 'Descrição do Vídeo 2' },
    { title: 'Vídeo 3', src: 'videos/video3.mp4', poster: 'videos/thumb3.jpg', description: 'Descrição do Vídeo 3' },
];

// Carrega a lista de vídeos
function loadVideoList() {
    videos.forEach((videoData, index) => {
        const li = document.createElement('li');
        li.textContent = videoData.title;

        // Cria o botão "Carregar"
        const button = document.createElement('button');
        button.textContent = 'Carregar';
        button.className = 'video-button';
        button.onclick = () => loadVideo(index);

        // Adiciona o botão ao item da lista
        li.appendChild(button);
        videoList.appendChild(li);
    });
}

// Carrega o vídeo selecionado
function loadVideo(index) {
    const videoData = videos[index];
    video.src = videoData.src;  // Define o caminho do vídeo
    video.poster = videoData.poster; // Define a imagem de miniatura
    video.load(); // Carrega o vídeo
    video.play(); // Reproduz automaticamente o vídeo quando carregado
}

// Controle de Play/Pause
playPauseBtn.onclick = () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        video.pause();
        playPauseBtn.textContent = 'Play';
    }
};

// Controle de Mute
muteBtn.onclick = () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
};

// Controle de Volume
volumeControl.oninput = () => {
    video.volume = volumeControl.value;
};

// Controle de Tempo
video.ontimeupdate = () => {
    timeControl.max = video.duration;
    timeControl.value = video.currentTime;
};

timeControl.oninput = () => {
    video.currentTime = timeControl.value;
};

// Inicialização
loadVideoList();
