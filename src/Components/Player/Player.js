import React, { useRef, useEffect, useState } from "react";
import "./Player.scss";
import "@fortawesome/fontawesome-free";
import Time from "../../Services/Helpers/Date/Time";

const time = new Time();

export default function Player() {
  const playerRef = useRef(null);

  const [duration, setDuration] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  const [isPlay, setPlayStatus] = useState(false);

  const [rateTimer, setRateTimer] = useState(0);

  const [volume, setVolume] = useState(100);

  const handleInfoPlayer = () => {
    if (playerRef.current !== null) {
      setDuration(playerRef.current.duration);
    }
  };

  const handlePlaying = () => {
    const currentTime = playerRef.current.currentTime;
    const duration = playerRef.current.duration;
    setCurrentTime(currentTime);

    const rateTimer = currentTime*100/duration;
    setRateTimer(rateTimer);
  }

  const handlePlay = () => {
    if (!isPlay){
        playerRef.current.play();
        setPlayStatus(true);
    }else{
        playerRef.current.pause();
        setPlayStatus(false);
    }
    
  }

  const setVolumeAudio  = (volume) => {
    setVolume(volume);
    const volumeRate = volume/100;
    playerRef.current.volume = volumeRate;
  }

  const handleVolume = (e) => {
    const volume = e.target.value;
    
    setVolumeAudio(volume)
    
  }

  const handleMuteVolume = () => {
    if (volume>0){
        setVolumeAudio(0);
    }else{
        setVolumeAudio(100);
    }
    
  }

  const handleSeekTimer = (e) => {
    const rateTimer = e.target.value;
    setRateTimer(rateTimer);
    const duration = playerRef.current.duration;
    //convert phần trăm => thời gian
    const currentTime = rateTimer/(100/duration);
    setCurrentTime(currentTime);

    playerRef.current.currentTime = currentTime;

    playerRef.current.pause();

    setPlayStatus(false);

    setTimeout(() => {
        handlePlay();
    }, 1000);
  }

  return (
    <div className="player">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <div className="player__song-info d-flex gap-3">
              <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/4/6/9/3/4693cff82edb7018039b8f9acc8fa40e.jpg" />
              <span className="d-flex flex-column justify-content-center">
                <a href="#">Tên bài hát</a>
                <a href="#">Ca sỹ</a>
              </span>
              <span className="d-flex flex-column justify-content-center">
                <a href="#">
                  <i className="fa-regular fa-heart"></i>
                </a>
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="player__inner">
              <div className="player__inner--action">
                <div className="row justify-content-center">
                  <div className="col-8">
                    <div className="d-flex gap-5 justify-content-center">
                      <span>
                        <i className="fa-solid fa-backward-step fa-2x"></i>
                      </span>
                      <span className="play-button" onClick={handlePlay}>
                        {
                            isPlay
                            ?
                            <i className="fa-solid fa-pause fa-3x"></i>
                            :
                            <i className="fa-solid fa-play fa-3x"></i>
                        }
                        
                      </span>
                      <span>
                        <i className="fa-solid fa-forward-step fa-2x"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="player__inner--timer">
                <div className="mt-2 d-flex gap-1">
                  <span>{time.getMins(currentTime)}</span>
                  <input
                    type={"range"}
                    className="form-range"
                    value={rateTimer}
                    onChange={handleSeekTimer}
                    step={0.1}
                  />
                  <span>{time.getMins(duration)}</span>
                </div>
              </div>
              <audio ref={playerRef} onLoadedData={handleInfoPlayer} onTimeUpdate={handlePlaying}>
                <source src="/mp3/hongnhan.mp3" type="audio/mp3" />
              </audio>
            </div>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-end">
            <div className="player__inner--volume d-flex gap-2 w-50">
              <span className="volume-button" onClick={handleMuteVolume}>
                {
                    volume>0
                    ?
                    <i className="fa-solid fa-volume-high"></i>
                    :
                    <i className="fa-solid fa-volume-xmark"></i>
                }
                
              </span>
              <input type={"range"} className="form-range" value={volume} onChange={handleVolume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
