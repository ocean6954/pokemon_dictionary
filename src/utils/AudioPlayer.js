import React from "react";
import useSound from "use-sound";

// 音声ファイルのパスを生成する関数
const getAudioPath = (id) => `/audio/${id.padStart(3, "0")}.mp3`;

// 音声再生コンポーネント
const AudioPlayer = ({ id }) => {
  const [play] = useSound(getAudioPath(id), {
    volume: 1,
    playbackRate: 1.0,
  });

  React.useEffect(() => {
    // idが変更されたときに音声を再生
    play();
    return () => {
      // コンポーネントがアンマウントされるときに音声を停止
      stop();
    };
  }, [id, play, stop]);
};

export default AudioPlayer;
