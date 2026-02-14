import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaHeart } from 'react-icons/fa';
import './VideoMessage.css';

function VideoMessage({ onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="screen video-screen">
      <motion.div
        className="video-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Título */}
        <motion.div
          className="video-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaHeart className="video-heart-icon" />
          <h2 className="video-title">Un mensaje especial para ti</h2>
          <p className="video-subtitle">Con todo mi corazón 💕</p>
        </motion.div>

        {/* Contenedor del video */}
        <motion.div
          className="video-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          <div className="video-frame">
            <video
              ref={videoRef}
              className="video-player"
              onClick={handleVideoClick}
              onEnded={handleVideoEnd}
              playsInline
              preload="metadata"
            >
              <source src={`${process.env.PUBLIC_URL}/video/video1.mp4`} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>

            {/* Overlay de play cuando está pausado */}
            {!isPlaying && (
              <motion.div
                className="play-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handlePlayPause}
              >
                <motion.div
                  className="play-button-large"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay />
                </motion.div>
              </motion.div>
            )}

            {/* Controles personalizados */}
            <motion.div
              className={`video-controls ${showControls ? 'show' : 'hide'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="control-button play-pause-btn"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <button
                className="control-button mute-btn"
                onClick={handleMuteToggle}
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </motion.div>

            {/* Corazones decorativos */}
            <div className="video-decorations">
              <FaHeart className="corner-heart top-left" />
              <FaHeart className="corner-heart top-right" />
              <FaHeart className="corner-heart bottom-left" />
              <FaHeart className="corner-heart bottom-right" />
            </div>
          </div>
        </motion.div>

        {/* Mensaje final */}
        <motion.div
          className="video-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="video-final-text">
            Gracias por ser parte de mi vida 💖
          </p>
          <p className="video-date">
            San Valentín 2026
          </p>
        </motion.div>

        {/* Botón continuar */}
        <motion.button
          className="btn-primary continue-video-button"
          onClick={onNext}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continuar a la carta 💌
        </motion.button>
      </motion.div>
    </div>
  );
}

export default VideoMessage;