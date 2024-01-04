import React from 'react';
import { Button, Container } from '@mui/material';
import './WelcomeScreen.scss';
import { animated, useSpring } from '@react-spring/web';

function WelcomeScreen({ onStart }) {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  return (
    <animated.div style={fade} className="welcome-screen">
      <Container maxWidth="sm" className="welcome-container">
      <img src="/logo.png" alt="Rock Paper Scissors Logo" className="game-logo" />
        <Button
          variant="contained"
          color="primary"
          onClick={onStart}
          className="start-button"
        >
          Start Game
        </Button>
      </Container>
    </animated.div>
  );
}

export default WelcomeScreen;
