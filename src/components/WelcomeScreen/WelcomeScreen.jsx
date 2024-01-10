import React from 'react';
import { Button, Container } from '@mui/material';
import './WelcomeScreen.scss';
import { animated, useSpring } from '@react-spring/web';
import PropTypes from 'prop-types'; 

function WelcomeScreen({ onStart }) {
  const entranceAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 170, friction: 14 },
  });

  WelcomeScreen.propTypes = {
    onStart: PropTypes.func.isRequired,
  };

  return (
    <animated.div style={entranceAnimation} className="welcome-screen">
      <Container maxWidth="sm" className="welcome-container">
        <img
          src="/logo.png"
          alt="Rock Paper Scissors Logo"
          className="game-logo"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onStart}
          className="start-button"
        >
          Start
        </Button>
      </Container>
    </animated.div>
  );
}

export default WelcomeScreen;
