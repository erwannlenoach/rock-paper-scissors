import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import MainScreen from './components/MainScreen/MainScreen';
import './App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <WelcomeScreen onStart={startGame} />
      ) : (
        <MainScreen />
      )}
    </div>
  );
}

export default App;
