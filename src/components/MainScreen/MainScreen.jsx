import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import WinnerScreen from '../WinnerScreen/WinnerScreen';
import RockIcon from '@mui/icons-material/Flare'; // Example icon for "rock"
import PaperIcon from '@mui/icons-material/Description'; // Example icon for "paper"
import ScissorsIcon from '@mui/icons-material/ContentCut'; // Example icon for "scissors"
import { animated, useSpring } from '@react-spring/web';
import './MainScreen.scss';


const choices = ['rock', 'paper', 'scissors'];
const choiceIcons = {
  rock: <RockIcon />,
  paper: <PaperIcon />,
  scissors: <ScissorsIcon />,
};

function MainScreen() {
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
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
      }, 2000);
    }, 1200); // Bot "thinking" time
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
    <Container maxWidth="sm" className="main-screen">
      <Typography variant="h4" gutterBottom>
        Rock Paper Scissors
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Score: {userScore} | Bot Score: {botScore}
      </Typography>
      <Box className="game-buttons">
        {choices.map((choice) => (
          <Button
            key={choice}
            variant="contained"
            onClick={() => handleChoice(choice)}
            disabled={showResult}
          >
            {choiceIcons[choice]}
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
              <Typography variant="caption">You chose: {userChoice}</Typography>
              <Typography variant="caption">Bot chose: {botChoice}</Typography>
            </Box>
          </>
        )}
      </animated.div>
    </Container>
  );
}

export default MainScreen;
