"use client";

import { useContext, useState } from "react";
import { FaPlay, FaPause } from 'react-icons/fa';
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
  const { playing, configPlayPause } = useContext(HomeContext);
  const [currentMusic, setCurrentMusic] = useState<Music | null>(null);

  const handleMusicClick = (music: Music) => {
    setCurrentMusic(music);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{playing ? "Playing" : "Paused"}</h1>
      
      <div className="flex flex-row mb-4">
        <button onClick={() => configPlayPause()} className="flex items-center">
          {playing ? <FaPause className="text-[50px] text-[tomato]" /> : <FaPlay className="text-[50px]" />}
        </button>
      </div>

      <div className="flex flex-row mt-8">
        <ul className="mr-8 space-y-4">
          {musics.map(music => (
            <li key={music.name} onClick={() => handleMusicClick(music)} className="cursor-pointer flex flex-col items-start">
              <img src={music.image} alt={music.name} className="w-[100px] h-[100px] mb-2 rounded" />
              <h3 className="text-lg font-bold">{music.name}</h3>
              <p className="text-sm">{music.author}</p>
            </li>
          ))}
        </ul>

        {currentMusic && (
          <div className="highlighted-music p-4 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Tocando agora: {currentMusic.name}</h2>
            <p className="mt-2 text-lg">Autor: {currentMusic.author}</p>
            <p className="mt-2">{currentMusic.description}</p>
            <img src={currentMusic.image} alt={currentMusic.name} className="w-[200px] h-[200px] mt-4 rounded-lg" />
            <audio controls src={currentMusic.urlAudio} className="mt-4 w-full">
              Seu navegador não suporta o elemento de áudio.
            </audio>
          </div>
        )}
      </div>
    </main>
  );
}
