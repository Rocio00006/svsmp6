import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import './FloatingHearts.css';

function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 15 + Math.random() * 20
  }));

  return (
    <div className="floating-hearts-container">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <FaHeart />
        </motion.div>
      ))}
    </div>
  );
}

export default FloatingHearts;