import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import WinnerScreen from '../WinnerScreen/WinnerScreen';
import GameButton from '../GameButton/GameButton';
import ResultAnnouncement from '../ResultAnnouncement/ResultAnnouncement';
import { choices, choicesObj,gameMessages, players } from '../../constants/constant'; // Import constants
import './MainScreen.scss';
import { animated, useSpring } from '@react-spring/web';
import PropTypes from 'prop-types';


function MainScreen() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [gameRound, setGameRound] = useState(0); // Additional state to trigger game logic
  const [winner, setWinner] = useState('');
  const [showResult, setShowResult] = useState(false);
  const logoAnimation = useSpring({
    loop: isAnimating,
    to: { transform: 'rotate(360deg)' },
    from: { transform: 'rotate(0deg)' },
    reset: isAnimating,
    config: { duration: 1000 }, // duration of one rotation
  });

  MainScreen.propTypes = {
    onStart: PropTypes.func.isRequired,
  };
  
  useEffect(() => {
    if (userChoice) {
      const newBotChoice = choices[Math.floor(Math.random() * choices.length)];
      setBotChoice(newBotChoice);
      determineWinner(userChoice, newBotChoice);
    }
  }, [gameRound]);

  useEffect(() => {
    if (userScore === 3) {
      setWinner(players.player);
    } else if (botScore === 3) {
      setWinner(players.bot);
    }
  }, [userScore, botScore]);

  const determineWinner = (user, bot) => {
    setIsAnimating(true); // Start the logo rotation

    setTimeout(() => {
      if (user === bot) {
        setWinner(gameMessages.tie);
      } else if (
        (user === choicesObj.rock && bot === choicesObj.scissors) ||
        (user === choicesObj.scissors && bot === choicesObj.paper) ||
        (user === choicesObj.paper && bot === choicesObj.rock)
      ) {
        setUserScore(userScore + 1);
        setWinner(gameMessages.playerWins);
      } else {
        setBotScore(botScore + 1);
        setWinner(gameMessages.botWins);
      }
      if (userScore === 3) {
        setWinner(players.player);
      } else if (botScore === 3) {
        setWinner(players.bot);
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
  if (winner === players.player || winner === players.bot) {
    return <WinnerScreen winner={winner} onRestart={restartGame} />;
  }

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
          <GameButton
            key={choice}
            choice={choice}
            onClick={handleChoice}
            disabled={showResult}
          />
        ))}
      </Box>
      <ResultAnnouncement
        showResult={showResult}
        winner={winner}
        userChoice={userChoice}
        botChoice={botChoice}
      />
    </Container>
  );
}

export default MainScreen;
