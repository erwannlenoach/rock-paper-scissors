import React from 'react';
import { Button, Typography, Container, Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';

function WinnerScreen({ winner, onRestart }) {
  // Define propTypes inside the component but outside of the render function
  WinnerScreen.propTypes = {
    winner: PropTypes.string.isRequired,
    onRestart: PropTypes.func.isRequired,
  };

  // Styling for the winner announcement paper
  const paperStyle = {
    padding: '20px',
    marginTop: '20vh',
    textAlign: 'center',
    backgroundColor: '#D6EAF8',
    borderRadius: '15px',
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} style={paperStyle}>
        <Box className="logo-container">
          <img
            src="/logo.png"
            alt="Rock Paper Scissors Logo"
            className="game-logo"
          />
        </Box>
        <Typography variant="h4" gutterBottom>
          {winner === 'player' ? 'Congratulations, you win!' : 'Sorry, the bot wins!'}
        </Typography>
        <Button variant="contained" color="primary" onClick={onRestart}>
          Play Again
        </Button>
      </Paper>
    </Container>
  );
}

export default WinnerScreen;
