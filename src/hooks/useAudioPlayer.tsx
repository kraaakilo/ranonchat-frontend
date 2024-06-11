import { useState, useEffect } from "react";

const useAudioPlayer = (url: string) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const playNotificationSound = () => setPlaying(!playing);

    useEffect(() => {
        audio.volume = 0.04;
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return {playing, playNotificationSound};
};

export default useAudioPlayer;