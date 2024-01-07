import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import WinnerScreen from '../WinnerScreen/WinnerScreen';
import RockIcon from '@mui/icons-material/Flare'; // Example icon for "rock"
import PaperIcon from '@mui/icons-material/Description'; // Example icon for "paper"
import ScissorsIcon from '@mui/icons-material/ContentCut'; // Example icon for "scissors"
import { animated, useSpring } from '@react-spring/web';
import './MainScreen.scss';

const choices = ['rock', 'paper', 'scissors'];

function MainScreen() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [gameRound, setGameRound] = useState(0); // Additional state to trigger game logic
  const [winner, setWinner] = useState('');
  const [showResult, setShowResult] = useState(false);
  const resultAnimation = useSpring({
    opacity: showResult ? 1 : 0,
    transform: showResult ? 'translateY(0)' : 'translateY(-20px)',
  });

  const logoAnimation = useSpring({
    loop: isAnimating,
    to: { transform: 'rotate(360deg)' },
    from: { transform: 'rotate(0deg)' },
    reset: isAnimating,
    config: { duration: 1000 }, // duration of one rotation
  });

  useEffect(() => {
    if (userChoice) {
      const newBotChoice = choices[Math.floor(Math.random() * choices.length)];
      setBotChoice(newBotChoice);
      determineWinner(userChoice, newBotChoice);
    }
  }, [gameRound]);

  useEffect(() => {
    if (userScore === 3) {
      setWinner('player');
    } else if (botScore === 3) {
      setWinner('bot');
    }
  }, [userScore, botScore]);

  const determineWinner = (user, bot) => {
    setIsAnimating(true); // Start the logo rotation

    setTimeout(() => {
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
      setIsAnimating(false); // Stop the logo rotation
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
      }, 2000);
    }, 1200);
  };

  const handleChoice = (choice) => {
    setUserChoice(choice);
    setGameRound((prev) => prev + 1);
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

  const iconSize = 'large'; // Change this as per your design requirement

  return (
    <Container maxWidth="sm" className="main-screen">
      <Box className="logo-container">
        <animated.img
          src="/logo.png"
          alt="Rock Paper Scissors Logo"
          className="game-logo"
          style={isAnimating ? logoAnimation : {}}
        />
      </Box>
      <Typography variant="h6" gutterBottom className="scoreboard">
        Player: {userScore} | Bot: {botScore}
      </Typography>
      <Box className="game-buttons">
        {choices.map((choice) => (
          <Button
            key={choice}
            variant="contained"
            onClick={() => handleChoice(choice)}
            disabled={showResult}
            className={`button-${choice}`}
          >
            {choice === 'rock' && <RockIcon fontSize={iconSize} />}
            {choice === 'paper' && <PaperIcon fontSize={iconSize} />}
            {choice === 'scissors' && <ScissorsIcon fontSize={iconSize} />}
          </Button>
        ))}
      </Box>
      <animated.div style={resultAnimation} className="result-announcement">
        {showResult && (
          <>
            <Typography variant="h6" gutterBottom>
              {winner === "It's a tie!" ? winner : `Round Result: ${winner}`}
            </Typography>
            <Box>
              <Typography variant="caption">
                {' '}
                You chose: {userChoice}
              </Typography>
              <Typography variant="caption"> Bot chose: {botChoice}</Typography>
            </Box>
          </>
        )}
      </animated.div>
    </Container>
  );
}

export default MainScreen;
