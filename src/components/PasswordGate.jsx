import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaHeart, FaUnlock } from 'react-icons/fa';
import './PasswordGate.css';

function PasswordGate({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const correctPassword = '07/11';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === correctPassword || password === '0711' || password === '7/11') {
      setIsUnlocking(true);
      // Sonido de éxito (opcional)
      const audio = new Audio(`${process.env.PUBLIC_URL}/audio/efecto-correcto.mp3`);
      audio.play().catch(() => {}); // Ignore si no existe el archivo

      // Esperar animación antes de avanzar
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      setIsWrong(true);
      setPassword('');
      setTimeout(() => setIsWrong(false), 3000);
    }
  };

  return (
    <div className="screen password-screen">
      <motion.div
        className="password-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Ícono de candado */}
        <motion.div
          className="lock-icon"
          animate={isWrong ? {
            x: [-10, 10, -10, 10, 0],
            rotate: [-5, 5, -5, 5, 0]
          } : isUnlocking ? {
            scale: [1, 1.3, 0],
            rotate: [0, 0, 360]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          {isUnlocking ? <FaUnlock /> : <FaLock />}
        </motion.div>

        {/* Título */}
        <motion.h2
          className="password-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Para continuar...
        </motion.h2>

        {/* Pregunta */}
        <motion.p
          className="password-question"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ¿Cuándo es nuestro aniversario?
        </motion.p>

        {/* Formulario */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="input-container">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="DD/MM"
              className={`password-input ${isWrong ? 'wrong' : ''} ${isUnlocking ? 'unlocking' : ''}`}
              maxLength="5"
              disabled={isUnlocking}
            />
            <small className="input-hint">Formato: DD/MM</small>
          </div>

          {isWrong && (
            <motion.p
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Mmm... esa no es la fecha, mi amor 💕 Intenta de nuevo
            </motion.p>
          )}

          {isUnlocking && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FaHeart className="success-heart" />
              <p>¡Correcto! 💖</p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="btn-primary"
            disabled={isUnlocking || password.length === 0}
            whileHover={{ scale: password.length > 0 ? 1.05 : 1 }}
            whileTap={{ scale: password.length > 0 ? 0.95 : 1 }}
            style={{ opacity: password.length === 0 ? 0.5 : 1 }}
          >
            {isUnlocking ? 'Abriendo...' : 'Enviar'}
          </motion.button>
        </motion.form>

        {/* Corazoncitos decorativos */}
        <div className="decorative-hearts">
          <motion.span
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💕
          </motion.span>
          <motion.span
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            💖
          </motion.span>
          <motion.span
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            💗
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

export default PasswordGate;