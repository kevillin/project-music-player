import { useEffect, useState } from "react";
import '../index.css';
import { IconContext } from "react-icons";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import useSound from "use-sound";
import underTheInfluence from "../assets/under_the_influence.mp3";
import underTheInfluenceWallPaper from "../assets/under_the_influence_wallpaper.jpg";

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(underTheInfluence);
  const [time, setTime] = useState({
    min: '',
    sec: '',
  });

  const [currentTime, setCurrentTime] = useState({
    min: '',
    sec: '',
  });

  const [seconds, setSeconds] = useState();

  useEffect(() => {
    const sec = duration / 1000;
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    setTime({
      min: min,
      sec: secRemain,
    })
  }, [duration, isPlaying])

  useEffect(() => {
    const interval = setInterval(() => {
      if(sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrentTime({
          min, sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound])

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };
  return (
    <div className="component">
      <h2>Playing Now</h2>
      <img
        className="music-cover"
        src={underTheInfluenceWallPaper} 
        alt="Wallpaper" />
      <div>
        <h3 className="title">Under The Influence</h3>
        <p className="subtitle">Chris Brown</p>
      </div>
      <div>
        <div className="time">
          <p>
            {currentTime.min}:{currentTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input 
        type= "range"
        min="0"
        max={duration / 1000}
        default='0'
        value={seconds}
        className="timeline"
        onChange={(e) => sound.seek([e.target.value])}
        />
      </div>
      <div>
        <button className="play-button" >
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="play-button" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="play-button" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="play-button">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}

export default Player;
