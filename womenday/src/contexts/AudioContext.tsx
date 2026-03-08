/*
  Personal Use License Notice:
  You may use this item multiple times for personal use only.
  You may not resell, redistribute, or use it for any commercial purpose.
  Unauthorized use may result in legal action.
*/
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

type Track = {
  id: number;
  title: string;
  caption: string;
  src: string;
  cover: string;
};

interface AudioContextType {
  activeTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  playTrack: (track: Track) => Promise<void>;
  pauseTrack: () => void;
  togglePlayPause: () => Promise<void>;
  seekTo: (progress: number) => void;
  stopAll: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      const d = audio.duration || 0;
      setDuration(d);
      setCurrentTime(audio.currentTime);
      setProgress(d ? audio.currentTime / d : 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.pause();
    };
  }, []);

  const playTrack = async (track: Track) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    // If it's a different track, load it
    if (!activeTrack || activeTrack.id !== track.id) {
      audio.src = track.src;
      audio.currentTime = 0;
      setActiveTrack(track);
      setProgress(0);
      setCurrentTime(0);
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Playback blocked or failed:', err);
      setIsPlaying(false);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current || !activeTrack) return;

    if (isPlaying) {
      pauseTrack();
    } else {
      await playTrack(activeTrack);
    }
  };

  const seekTo = (progressValue: number) => {
    if (!audioRef.current || !activeTrack) return;
    
    const audio = audioRef.current;
    if (!audio.duration) return;
    
    const time = (progressValue / 100) * audio.duration;
    audio.currentTime = time;
    setCurrentTime(time);
    setProgress(progressValue / 100);
  };

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveTrack(null);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
  };

  const value: AudioContextType = {
    activeTrack,
    isPlaying,
    progress,
    currentTime,
    duration,
    playTrack,
    pauseTrack,
    togglePlayPause,
    seekTo,
    stopAll,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
