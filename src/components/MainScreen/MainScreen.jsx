import React, { useState, useEffect } from 'react';
import { Button, Typography, Container } from '@mui/material';
import WinnerScreen from '../WinnerScreen/WinnerScreen';

const choices = ['rock', 'paper', 'scissors'];

function MainScreen() {
  const [userChoice, setUserChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [gameRound, setGameRound] = useState(0); // Additional state to trigger game logic
  const [winner, setWinner] = useState('');

  useEffect(() => {
    if (userChoice) {
      const newBotChoice = choices[Math.floor(Math.random() * choices.length)];
      setBotChoice(newBotChoice);
      determineWinner(userChoice, newBotChoice);
    }
  }, [gameRound]); // Depend on gameRound for triggering the game logic

  useEffect(() => {
    if (userScore === 3) {
      setWinner('player');
    } else if (botScore === 3) {
      setWinner('bot');
    }
  }, [userScore, botScore]); // Check for winner after score updates

  const determineWinner = (user, bot) => {
    if (user === bot) {
      setWinner("It's a tie!");
    } else if (
      (user === 'rock' && bot === 'scissors') ||
      (user === 'scissors' && bot === 'paper') ||
      (user === 'paper' && bot === 'rock')
    ) {
      setUserScore(userScore + 1);
      setWinner('You win!');
    } else {
      setBotScore(botScore + 1);
      setWinner('Bot wins!');
    }
    if (userScore === 3) {
      setWinner('player');
    } else if (botScore === 3) {
      setWinner('bot');
    }
  };

  const handleChoice = (choice) => {
    setUserChoice(choice);
    setGameRound((prev) => prev + 1); // Increment gameRound to trigger the game logic
  };

  const restartGame = () => {
    setUserScore(0);
    setBotScore(0);
    setWinner('');
    setUserChoice(null); // Reset the user choice
    setBotChoice(null); // Reset the bot choice
    setGameRound(0); // Reset game round
  };
  if (winner === 'player' || winner === 'bot') {
    return <WinnerScreen winner={winner} onRestart={restartGame} />;
  }

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20vh' }}>
      <Typography variant="h4" gutterBottom>
        Rock Paper Scissors
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Score: {userScore} | Bot Score: {botScore}
      </Typography>
      <div>
        {choices.map((choice) => (
          <Button
            key={choice}
            variant="contained"
            style={{ margin: '10px' }}
            onClick={() => handleChoice(choice)}
          >
            {choice}
          </Button>
        ))}
      </div>
      <Typography variant="h6" gutterBottom>
        {winner && <p>{winner}</p>}
        {botChoice && <p>Bot chose: {botChoice}</p>}
      </Typography>
    </Container>
  );
}

export default MainScreen;
