import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaEnvelopeOpen, FaHeart } from 'react-icons/fa';
import './LoveLetter.css';

function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
  };

  return (
    <div className="screen letter-screen">
      {!isOpen ? (
        // Sobre cerrado
        <motion.div
          className="envelope-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="envelope-icon"
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaEnvelope />
          </motion.div>

          <motion.h2
            className="envelope-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Una carta para ti
          </motion.h2>

          <motion.p
            className="envelope-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Con todo mi amor 💕
          </motion.p>

          <motion.button
            className="btn-primary open-button"
            onClick={handleOpenLetter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Abrir carta
          </motion.button>
        </motion.div>
      ) : (
        // Carta abierta
        <motion.div
          className="letter-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Ícono de sobre abierto */}
          <motion.div
            className="opened-envelope-icon"
            initial={{ y: 0 }}
            animate={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaEnvelopeOpen />
          </motion.div>

          {/* Papel de la carta */}
          <motion.div
            className="letter-paper"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Decoración superior */}
            <div className="letter-decoration-top">
              <FaHeart />
              <div className="decoration-line"></div>
              <FaHeart />
            </div>

            {/* Contenido de la carta */}
            <motion.div
              className="letter-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <p className="letter-greeting">Mi amor,</p>

              <p className="letter-text">
                Hoy celebramos un día más juntos, y quiero que sepas que cada momento a tu lado 
                es un regalo que atesoro en mi corazón. Desde nuestro primer encuentro, mi vida 
                se llenó de colores, risas y una felicidad que solo tú sabes crear.
              </p>

              <p className="letter-text">
                Gracias por cada abrazo que calma mis miedos, por cada sonrisa que ilumina mis días, 
                y por elegirme cada día para compartir esta hermosa aventura llamada vida. Contigo 
                he aprendido que el amor verdadero no solo existe en los cuentos, sino que se 
                construye con pequeños detalles, con paciencia y con la decisión de estar juntos 
                en cada paso del camino.
              </p>

              <p className="letter-text">
                Eres mi compañero, mi confidente, mi mejor amigo y el amor de mi vida. Cada 
                fotografía que tomamos, cada canción que compartimos y cada aventura que vivimos 
                se convierte en un tesoro que guardo en lo más profundo de mi ser.
              </p>

              <p className="letter-text">
                Cómo te explico que quiero estar incluso cuando ya no puedas ni contigo, 
                que quiero sujetarte entre mis brazos cuando tus piernas pesan demasiado, 
                que no me importa si hay días en los que apenas puedes sonreír y no quieres 
                hablarme de lo que te ronda por la cabeza, aunque yo prometo escucharte ser 
                silencio si lo prefieres o arrancarle una carcajada nerviosa favorita.  
              </p>

              <p className="letter-text">
                Cómo te explico que no siempre tienes que estar bien y enmascararte una sonrisa,
                al menos no conmigo, porque quiero verte a ti y ser un lugar seguro para que no tengas que pretender. 
              </p>

              <p className="letter-text">
                Quiero conocer cada milímetro de ti, verte todas las formas posibles y en todos tus estados de ánimo. 
                Que cuando lo malo explote seré la primera en ponerme delante o a tu lado porque tus heridas serán 
                las mías y nos tendremos para curarnos. 
              </p>

              <p className="letter-text">
                Cómo puedo hacerte entender que quiero ser todo lo que necesites que hace tiempo que te elegí 
                sabiendo que ningún ser humano es perfecto y que existen momentos en los que la existencia nos 
                cuesta un poco más de esfuerzo, pero es justo ahí donde te prometo que quiero estar para ti contigo. 
              </p>

              <p className="letter-text">
                Prometo seguir amándote con la misma intensidad de siempre, cuidarte, apoyarte 
                en tus sueños y ser tu refugio cuando lo necesites. Porque contigo, mi amor, 
                he encontrado mi hogar.
              </p>

              <p className="letter-closing">
                Con todo mi amor,
              </p>

              <p className="letter-signature">
                Mariela 💕
              </p>
            </motion.div>

            {/* Decoración inferior */}
            <div className="letter-decoration-bottom">
              <FaHeart />
              <div className="decoration-line"></div>
              <FaHeart />
            </div>

            {/* Corazones flotantes alrededor */}
            <div className="letter-floating-hearts">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="floating-letter-heart"
                  style={{
                    left: `${(i % 4) * 25}%`,
                    top: `${Math.floor(i / 4) * 100}%`
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <FaHeart />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mensaje final */}
          <motion.p
            className="final-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            ✨ Feliz San Valentín, mi amor ✨
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}

export default LoveLetter;