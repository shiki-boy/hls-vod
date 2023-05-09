import { useRef, useState, useEffect } from "react";
import Plyr from "plyr";
import Hls from "hls.js";

const defaults = {
  options: {
    controls: [
      "rewind",
      "play",
      "fast-forward",
      "progress",
      "current-time",
      "duration",
      "mute",
      "volume",
      "settings",
      "fullscreen",
    ],
    i18n: {
      restart: "Restart",
      rewind: "Rewind {seektime}s",
      play: "Play",
      pause: "Pause",
      fastForward: "Forward {seektime}s",
      seek: "Seek",
      seekLabel: "{currentTime} of {duration}",
      played: "Played",
      buffered: "Buffered",
      currentTime: "Current time",
      duration: "Duration",
      volume: "Volume",
      mute: "Mute",
      unmute: "Unmute",
      enableCaptions: "Enable captions",
      disableCaptions: "Disable captions",
      download: "Download",
      enterFullscreen: "Enter fullscreen",
      exitFullscreen: "Exit fullscreen",
      frameTitle: "Player for {title}",
      captions: "Captions",
      settings: "Settings",
      menuBack: "Go back to previous menu",
      speed: "Speed",
      normal: "Normal",
      quality: "Quality",
      loop: "Loop",
    },
  },
  sources: {
    type: "video",
    sources: [],
  },
};

const VideoPlayer = ({ options, sources }) => {
  const [player, setPlayer] = useState(null);

  const videoRef = useRef(null);
  const hlsRef = useRef(new Hls());

  const updateQuality = newQuality => {
    const selectedLevel = hlsRef.current.levels.findIndex( (level) => ( level.height === newQuality ) )

    hlsRef.current.currentLevel = selectedLevel
  }

  useEffect(() => {
    if (videoRef.current) {
      const videoEl = videoRef.current

      var videoSrc =
        "https://d5x6jnta5gmi7.cloudfront.net/0029390c-00eb-4953-8268-1105360b2f18/AppleHLS1/movie.m3u8";

      if (Hls.isSupported()) {
        hlsRef.current.loadSource(videoSrc);

        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          const availableQualtities = hlsRef.current.levels.map((el) => el.height);

          defaults.options.quality = {
            default: availableQualtities[0],
            options: availableQualtities,
            forced: true,
            onChange: updateQuality
          };

          hlsRef.current.attachMedia(videoEl);

          const _player = new Plyr(videoEl, options ?? defaults.options);

          setPlayer(_player);
        });
      }
    }
  }, []);

  return <video ref={videoRef} className="js-plyr plyr"></video>;
};

export default VideoPlayer;
