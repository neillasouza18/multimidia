"use client";

import { useContext, useState, useEffect } from "react";
import { FaPlay, FaPause, FaBackward, FaForward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { HomeContext } from "./context/HomeContext";
import { musics } from "./dados/music"; // Certifique-se de que o caminho está correto

type Music = {
  name: string;
  author: string;
  description: string;
  urlAudio: string;
  image: string;
};

export default function Home() {
  const { playing, setPlayingState, togglePlayPause, setAudio, audio, currentMusic, setCurrentMusic, volume, adjustVolume } = useContext(HomeContext);
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);
  
  const [isMuted, setIsMuted] = useState(false);

  const handleMusicClick = (music: Music) => {
    if (currentMusic === music.name) {
      togglePlayPause();
    } else {
      if (audio) {
        audio.pause();
      }

      setSelectedMusic(music);
      setCurrentMusic(music.name);

      const newAudio = new Audio(music.urlAudio);
      setAudio(newAudio);
      adjustVolume(volume);

      // Começa a tocar a nova música com atraso
      setTimeout(() => {
        newAudio.play().catch(error => {
          console.error("Erro ao tocar a música:", error);
        });
      }, 100); // Atraso de 100 milissegundos

      setPlayingState(true);
    }
  };

  // Atualiza o slider de duração
  useEffect(() => {
    if (audio) {
      const updateSlider = () => {
        const slider = document.getElementById("durationSlider") as HTMLInputElement;
        if (slider && audio.duration) {
          slider.max = audio.duration.toString();
          slider.value = audio.currentTime.toString();
        }
      };

      const intervalId = setInterval(updateSlider, 1000); // Atualiza a cada segundo

      return () => clearInterval(intervalId);
    }
  }, [audio]);

  // Funções para avançar e retroceder músicas
  const skipForward = () => {
    if (selectedMusic) {
      const currentIndex = musics.findIndex(music => music.name === selectedMusic.name);
      const nextIndex = (currentIndex + 1) % musics.length; // Volta para o início se chegar ao final
      handleMusicClick(musics[nextIndex]); // Toca a próxima música
    }
  };

  const skipBackward = () => {
    if (selectedMusic) {
      const currentIndex = musics.findIndex(music => music.name === selectedMusic.name);
      const previousIndex = (currentIndex - 1 + musics.length) % musics.length; // Volta para o final se estiver no início
      handleMusicClick(musics[previousIndex]); // Toca a música anterior
    }
  };

  // Função para mutar/desmutar o volume
  const toggleMute = () => {
    if (audio) {
      audio.muted = !isMuted; // Altera o estado de mute
      setIsMuted(prev => !prev); // Atualiza o estado de mudo
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-pink-500">
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm mx-auto flex flex-col items-center" style={{ height: '300px' }}>
        {/* Imagem da música que está tocando */}
        {selectedMusic ? (
          <>
            <img src={selectedMusic.image} alt={selectedMusic.name} className="w-32 h-32 object-cover rounded mb-2" />
            <h3 className="text-lg font-bold text-gray-600">{selectedMusic.name}</h3>
            <p className="text-sm text-gray-600">{selectedMusic.author}</p>
          </>
        ) : (
          <>
            <div className="w-32 h-32 border-2 border-gray-300 rounded mb-2 flex items-center justify-center">
              <img src="" alt="placeholder" className="w-32 h-32 object-cover rounded" /> {/* Imagem placeholder */}
            </div>
            <h3 className="text-lg font-bold text-gray-600">...</h3>
            <p className="text-sm text-gray-600">...</p>
          </>
        )}

        {/* Slider para a duração da música */}
        <input
          type="range"
          id="durationSlider"
          min="0"
          max={audio?.duration || 0} // Duração da música
          value={audio ? audio.currentTime : 0} // Tempo atual da música
          onChange={(e) => {
            if (audio) {
              audio.currentTime = Number(e.target.value); // Atualiza o tempo atual ao mover o slider
            }
          }}
          className={`w-60 mt-2 ${audio ? 'bg-pink-300' : 'bg-gray-300'}`} // Slider horizontal
          disabled={!audio} // Desabilita o slider se não houver música
        />

        {/* Botões de controle */}
        <div className="flex items-center mt-2">
          <div className="flex space-x-2">
            <button 
              onClick={skipBackward} 
              className={`flex items-center justify-center h-8 w-8 rounded-full ${audio ? 'bg-pink-600' : 'bg-gray-300'} text-white transition-colors duration-300`} 
              disabled={!audio}
            >
              <FaBackward className="text-lg" />
            </button>

            <button 
              onClick={() => togglePlayPause()} 
              className={`flex items-center justify-center p-2 rounded-full ${audio ? 'bg-pink-600' : 'bg-gray-300'} text-white hover:bg-pink-700 transition-colors duration-300`} 
              disabled={!audio}
            >
              {playing ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl" />}
            </button>

            <button 
              onClick={skipForward} 
              className={`flex items-center justify-center h-8 w-8 rounded-full ${audio ? 'bg-pink-600' : 'bg-gray-300'} text-white transition-colors duration-300`} 
              disabled={!audio}
            >
              <FaForward className="text-lg" />
            </button>
          </div>
        </div>

        {/* Slider de volume horizontal com botão de mute à esquerda */}
        <div className="w-2/1 -mt-1 flex items-center mt-2">
          {/* Botão de mute/desmute */}
          <button 
            onClick={toggleMute} 
            className={`flex items-center justify-center h-6 w-6 rounded-full ${audio ? 'bg-pink-600' : 'bg-gray-300'} text-white transition-colors duration-300 mr-2`} 
            disabled={!audio}
          >
            {isMuted ? <FaVolumeMute className="text-lg" /> : <FaVolumeUp className="text-lg" />}
          </button>

          {/* Slider de volume */}
          <div className="w-8/2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => adjustVolume(Number(e.target.value))} // Ajusta o volume ao mover o slider
              className="w-full mt-2 bg-pink-300" // Slider horizontal de volume
            />
          </div>
        </div>

      </div>

      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xs ml-auto my-auto flex items-center justify-center mt-4">
        <div className="flex flex-col">
          <ul className="space-y-4">
            {musics.map(music => (
              <li
                key={music.name}
                onClick={() => handleMusicClick(music)}
                className={`cursor-pointer flex flex-row items-center rounded-lg p-2 hover:bg-gray-100 transition-colors duration-300 ${currentMusic === music.name ? 'bg-gray-300' : 'bg-gray-50'}`} // Adicionando a cor de fundo quando a música está tocando
              >
                <img src={music.image} alt={music.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-gray-600">{music.name}</h3>
                  <p className="text-sm text-gray-600">{music.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}