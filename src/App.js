import { useState } from 'react';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import PasswordGate from './components/PasswordGate';
import MusicQuiz from './components/MusicQuiz';
import PhotoCarousel from './components/PhotoCarousel';
import VideoMessage from './components/VideoMessage';
import LoveLetter from './components/LoveLetter';
import FloatingHearts from './components/FloatingHearts';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    <WelcomeScreen onNext={() => setCurrentScreen(1)} />,
    <PasswordGate onSuccess={() => setCurrentScreen(2)} />,
    <MusicQuiz onComplete={() => setCurrentScreen(3)} />,
    <PhotoCarousel 
      title="💕 Nuestros Momentos 💕"
      folder="pareja"
      totalPhotos={5}
      onNext={() => setCurrentScreen(4)}
    />,
    <PhotoCarousel 
      title="🍽️ Sabores que Compartimos 🍽️"
      folder="comida"
      totalPhotos={9}
      onNext={() => setCurrentScreen(5)}
    />,
    <PhotoCarousel 
      title="✈️ Aventuras Juntos ✈️"
      folder="viajes"
      totalPhotos={10}
      onNext={() => setCurrentScreen(6)}
    />,
    <VideoMessage onNext={() => setCurrentScreen(7)} />,
    <LoveLetter />
  ];

  return (
    <div className="App">
      <FloatingHearts />
      {screens[currentScreen]}
    </div>
  );
}

export default App;