'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react';

type HomeContextData = {
    playing: boolean;
    togglePlayPause: () => void;
    setPlayingState: (newState: boolean) => void;
    setAudio: (audio: HTMLAudioElement | null) => void;
    audio: HTMLAudioElement | null;
    currentMusic: string | null;
    setCurrentMusic: (music: string) => void;
    volume: number; // Adicionado
    adjustVolume: (newVolume: number) => void; // Adicionado
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({ children }: ProviderProps) => {
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [currentMusic, setCurrentMusic] = useState<string | null>(null);
    const [volume, setVolume] = useState(1); // Adicionado: estado para volume

    const togglePlayPause = () => {
        if (audio) {
            if (playing) {
                pause();
            } else {
                play();
            }
            audio.volume = volume;
            setPlaying(!playing);
        }
    };

    const play = () => {
        if (!audio) return;
        audio.play();
        audio.volume = volume;
    };

    const pause = () => {
        if (!audio) return;
        audio.pause();
        audio.volume = volume;
    };

    const setPlayingState = (newState: boolean) => {
        setPlaying(newState);
    };

    const adjustVolume = (newVolume: number) => { // Adicionado: função para ajustar volume
        if (audio) {
            audio.volume = newVolume; // Ajusta o volume do áudio
        }
        setVolume(newVolume); // Atualiza o estado do volume
    };

    // Pausar a música anterior quando a nova música for carregada
    useEffect(() => {
        if (audio) {
            // Pausa o áudio anterior antes de configurar um novo
            audio.pause();
        }
    }, [currentMusic]);

    return (
        <HomeContext.Provider value={{ 
            playing, 
            setPlayingState, 
            togglePlayPause, 
            setAudio, 
            audio, 
            currentMusic, 
            setCurrentMusic, 
            volume, // Adicionado
            adjustVolume // Adicionado
        }}>
            {children}
        </HomeContext.Provider>
    );
};

export default HomeContextProvider;
