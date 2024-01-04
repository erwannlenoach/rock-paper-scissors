import React from 'react';
import { Button, Typography, Container } from '@mui/material';

function WinnerScreen({ winner, onRestart }) {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20vh' }}>
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
