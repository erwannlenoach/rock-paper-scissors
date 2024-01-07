import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes

function WinnerScreen({ winner, onRestart }) {
  WinnerScreen.propTypes = {
    onStart: PropTypes.func.isRequired,
    onRestart: PropTypes.func.isRequired,
    winner: PropTypes.string.isRequired,
  };
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20vh' }}>
      <Box className="logo-container">
        <img
          src="/logo.png"
          alt="Rock Paper Scissors Logo"
          className="game-logo"
        />
      </Box>
      <Typography variant="h4" gutterBottom>
        {winner === 'player'
          ? 'Congratulations, you win!'
          : 'Sorry, the bot wins!'}
      </Typography>
      <Button variant="contained" color="primary" onClick={onRestart}>
        Play Again
      </Button>
    </Container>
  );
}

export default WinnerScreen;
