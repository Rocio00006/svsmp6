import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import './WelcomeScreen.css';

function WelcomeScreen({ onNext }) {
  return (
    <div className="screen welcome-screen">
      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          className="heart-icon"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <FaHeart />
        </motion.div>

        <motion.h1
          className="welcome-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Feliz Día de
          <br />
          San Valentín
        </motion.h1>

        <motion.p
          className="welcome-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Tengo una sorpresa especial para ti
        </motion.p>

        <motion.button
          className="btn-primary"
          onClick={onNext}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Abrir Sorpresa 💝
        </motion.button>
      </motion.div>
    </div>
  );
}

export default WelcomeScreen;