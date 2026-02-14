import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaMusic, FaHeart, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './MusicQuiz.css';

function MusicQuiz({ onComplete }) {
  const [selectedSong, setSelectedSong] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [audioElements] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

    const songs = [
    {
        id: 1,
        title: "Imagina que tú y yo...",
        file: `${process.env.PUBLIC_URL}/audio/cancion1.mp3`,
        emoji: "🎶"
    },
    {
        id: 2,
        title: "Ámame...",
        file: `${process.env.PUBLIC_URL}/audio/cancion2.mp3`,
        emoji: "🎶"
    },
    {
        id: 3,
        title: "Para estar los dos",
        file: `${process.env.PUBLIC_URL}/audio/cancion3.mp3`,
        emoji: "🎶"
    }
    ];

  const handlePlayPause = (songId, file) => {
    // Si ya existe el audio element, usarlo
    if (audioElements[songId]) {
      const audio = audioElements[songId];
      
      if (playingId === songId) {
        audio.pause();
        setPlayingId(null);
      } else {
        // Pausar cualquier otra canción que esté sonando
        Object.values(audioElements).forEach(a => a.pause());
        audio.play();
        setPlayingId(songId);
      }
    } else {
      // Crear nuevo audio element
      const audio = new Audio(file);
      audioElements[songId] = audio;
      
      // Pausar todas las demás
      Object.values(audioElements).forEach(a => a.pause());
      
      audio.play();
      setPlayingId(songId);
      
      // Cuando termine, actualizar estado
      audio.onended = () => setPlayingId(null);
    }
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song.id);
    
    // Pausar todo el audio primero
    Object.values(audioElements).forEach(a => a.pause());
    setPlayingId(null);
    
    // Mostrar confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    
    // Reproducir la canción seleccionada
    setTimeout(() => {
      handlePlayPause(song.id, song.file);
    }, 500);
  };

  const handleNext = () => {
    // Pausar todo el audio
    Object.values(audioElements).forEach(a => a.pause());
    setPlayingId(null);
    
    onComplete();
  };

  const handleBack = () => {
    // Pausar todo el audio
    Object.values(audioElements).forEach(a => a.pause());
    setPlayingId(null);
    setSelectedSong(null);
    setShowConfetti(false);
  };

  return (
    <div className="screen music-quiz-screen">
      <motion.div
        className="quiz-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Título */}
        <motion.div
          className="quiz-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FaMusic className="music-icon" />
          <h2 className="quiz-title">Nuestra Canción</h2>
          <p className="quiz-question">¿Qué canción te recuerda a nosotros?</p>
        </motion.div>

        {/* Opciones de canciones */}
        <div className="songs-grid">
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              className={`song-card ${selectedSong === song.id ? 'selected' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.15 }}
              whileHover={{ scale: selectedSong && selectedSong !== song.id ? 1 : 1.03 }}
            >
              {/* Botón de play/pause */}
              <button
                className={`play-button ${playingId === song.id ? 'playing' : ''}`}
                onClick={() => handlePlayPause(song.id, song.file)}
                disabled={selectedSong !== null && selectedSong !== song.id}
              >
                {playingId === song.id ? <FaPause /> : <FaPlay />}
              </button>

              {/* Info de la canción */}
              <div className="song-info">
                <span className="song-emoji">{song.emoji}</span>
                <h3 className="song-title">{song.title}</h3>
              </div>

              {/* Botón de seleccionar */}
              <motion.button
                className="select-button"
                onClick={() => handleSelectSong(song)}
                disabled={selectedSong !== null && selectedSong !== song.id}
                whileHover={{ scale: selectedSong && selectedSong !== song.id ? 1 : 1.05 }}
                whileTap={{ scale: selectedSong && selectedSong !== song.id ? 1 : 0.95 }}
              >
                {selectedSong === song.id ? 'Siiii 💖' : 'Elegir esta'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Mensaje de ayuda */}
        {!selectedSong && (
          <motion.p
            className="quiz-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Toca ▶️ para escuchar cada canción
          </motion.p>
        )}

        {/* Botones de navegación */}
        {selectedSong && (
          <motion.div
            className="navigation-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="nav-button back-button"
              onClick={handleBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft />
              <span>Volver a elegir</span>
            </motion.button>

            <motion.button
              className="nav-button next-button"
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Continuar</span>
              <FaArrowRight />
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Animación de confetti/corazones cuando selecciona */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="confetti-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="confetti-heart"
                initial={{
                  x: '50vw',
                  y: '50vh',
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0, 1.5, 0],
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut'
                }}
              >
                <FaHeart />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MusicQuiz;