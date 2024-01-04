import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Button, Typography, Container } from '@mui/material';
import './WelcomeScreen.css'; // For additional custom styling

function WelcomeScreen({ onStart }) {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  return (
    <animated.div style={fade}>
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20vh' }}>
        <Typography variant="h2" style={{ color: '#ff33cc', marginBottom: '20px' }}>
          Rock-Paper-Scissors
        </Typography>
        <Typography variant="h5" style={{ color: '#ccff33', marginBottom: '20px' }}>
          Welcome to the Retro Battle!
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onStart}
          style={{ backgroundColor: '#33ccff' }}
        >
          Start Game
        </Button>
      </Container>
    </animated.div>
  );
}

export default WelcomeScreen;
