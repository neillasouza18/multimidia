'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react';

type HomeContextData = {
    playing: boolean;
    configPlayPause: () => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({ children }: ProviderProps) => {
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement>();

    useEffect(() => {
        const newAudio = new Audio("audios/audio1.mp3");
        setAudio(newAudio);
    }, []);

    const configPlayPause = () => {
        if (playing) {
            pause();
        } else {
            play();
        }
        setPlaying(!playing);
    }

    const play = () => {
        if (!audio) return;
        audio.play();
    }

    const pause = () => {
        if (!audio) return;
        audio.pause();
    }

    return (
        <HomeContext.Provider value={{ playing, configPlayPause }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;
