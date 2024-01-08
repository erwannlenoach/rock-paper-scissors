import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import WinnerScreen from '../WinnerScreen/WinnerScreen';
import GameButton from '../GameButton/GameButton';
import ResultAnnouncement from '../ResultAnnouncement/ResultAnnouncement';
import {
  choices,
  choicesObj,
  gameMessages,
  players,
} from '../../constants/constant';
import './MainScreen.scss';
import { animated, useSpring } from '@react-spring/web';
import PropTypes from 'prop-types';

function MainScreen() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [gameRound, setGameRound] = useState(0);
  const [winner, setWinner] = useState('');
  const [showResult, setShowResult] = useState(false);
  const logoAnimation = useSpring({
    loop: isAnimating,
    to: { transform: 'rotate(360deg)' },
    from: { transform: 'rotate(0deg)' },
    reset: isAnimating,
    config: { duration: 1000 },
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
    const finalWinner =
      userScore === 3 ? players.player : botScore === 3 ? players.bot : '';
    if (finalWinner) setWinner(finalWinner);
  }, [userScore, botScore]);

  const determineWinner = (user, bot) => {
    setIsAnimating(true);

    setTimeout(() => {
      const outcomes = {
        [choicesObj.rock]: choicesObj.scissors,
        [choicesObj.scissors]: choicesObj.paper,
        [choicesObj.paper]: choicesObj.rock,
      };

      const result =
        user === bot
          ? gameMessages.tie
          : outcomes[user] === bot
            ? gameMessages.playerWins
            : gameMessages.botWins;

      setWinner(result);

      result === gameMessages.playerWins
        ? setUserScore((score) => score + 1)
        : result === gameMessages.botWins
          ? setBotScore((score) => score + 1)
          : null;

      setUserScore((score) => {
        if (score === 3) setWinner(players.player);
        return score;
      });

      setBotScore((score) => {
        if (score === 3) setWinner(players.bot);
        return score;
      });

      setIsAnimating(false);
      setShowResult(true);
      setTimeout(() => setShowResult(false), 2000);
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
    setUserChoice(null);
    setBotChoice(null);
    setGameRound(0);
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
