import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import './PhotoCarousel.css';

function PhotoCarousel({ title, folder, totalPhotos, onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Generar array de fotos basado en la cantidad
    const photos = Array.from({ length: totalPhotos }, (_, i) => ({
    id: i + 1,
    src: `${process.env.PUBLIC_URL}/images/${folder}/foto${i + 1}.jpg`,
    alt: `${folder} ${i + 1}`
    }));

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleContinue = () => {
    if (onNext) {
      onNext();
    }
  };

  // Variantes para la animación de slide
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="screen carousel-screen">
      <motion.div
        className="carousel-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Título */}
        <motion.h2
          className="carousel-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h2>

        {/* Contador de fotos */}
        <motion.div
          className="photo-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <FaHeart className="counter-heart" />
          <span>{currentIndex + 1} / {totalPhotos}</span>
        </motion.div>

        {/* Carousel */}
        <div className="carousel-wrapper">
          {/* Botón anterior */}
          <motion.button
            className="carousel-button prev-button"
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft />
          </motion.button>

          {/* Contenedor de la foto */}
          <div className="photo-container">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="photo-wrapper"
              >
                <img
                  src={photos[currentIndex].src}
                  alt={photos[currentIndex].alt}
                  className="carousel-photo"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600/FFB3D9/FFFFFF?text=Foto+' + (currentIndex + 1);
                  }}
                />
                
                {/* Corazoncitos decorativos en las esquinas */}
                <div className="photo-decorations">
                  <FaHeart className="corner-heart top-left" />
                  <FaHeart className="corner-heart top-right" />
                  <FaHeart className="corner-heart bottom-left" />
                  <FaHeart className="corner-heart bottom-right" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Botón siguiente */}
          <motion.button
            className="carousel-button next-button"
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight />
          </motion.button>
        </div>

        {/* Indicadores de puntos */}
        <div className="dots-container">
          {photos.map((_, index) => (
            <motion.button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Botón continuar */}
        <motion.button
          className="btn-primary continue-button"
          onClick={handleContinue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continuar ✨
        </motion.button>

        {/* Mensaje de ayuda para móvil */}
        <motion.p
          className="swipe-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Usa las flechas para navegar.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default PhotoCarousel;