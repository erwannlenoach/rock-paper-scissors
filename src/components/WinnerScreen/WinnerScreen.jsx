import React from 'react';
import { Button, Typography, Container, Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { resultMessages, players } from '../../constants/constant';

function WinnerScreen({ winner, onRestart }) {
  WinnerScreen.propTypes = {
    winner: PropTypes.string.isRequired,
    onRestart: PropTypes.func.isRequired,
  };

  const paperStyle = {
    padding: '20px',
    marginTop: '20vh',
    textAlign: 'center',
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
          {winner === players.player
            ? resultMessages.playerWins
            : resultMessages.botWins}
        </Typography>
        <Button variant="contained" color="primary" onClick={onRestart}>
          Play Again
        </Button>
      </Paper>
    </Container>
  );
}

export default WinnerScreen;
