import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import PropTypes from 'prop-types';
import { gameMessages, resultColors} from '../../constants/constant';

const ResultAnnouncement = ({ showResult, winner, userChoice, botChoice }) => {
  const resultAnimation = useSpring({
    opacity: showResult ? 1 : 0,
    transform: showResult ? 'translateY(0)' : 'translateY(-20px)',
  });

  const currentColors = winner === gameMessages.tie ? 'tie'
                      : winner === gameMessages.playerWins ? 'playerWin'
                      : 'botWin';

  const boxStyle = {
    padding: '10px',
    margin: '20px 0',
    backgroundColor: resultColors.backgroundColor[currentColors],
    border: '1px solid',
    borderColor: resultColors.borderColor[currentColors],
    borderRadius: '10px',
  };

  return (
    <animated.div style={resultAnimation}>
      <Paper elevation={4} style={boxStyle}>
        <Typography variant="h6" gutterBottom>
          {winner === gameMessages.tie ? winner : `Round Result: ${winner}`}
        </Typography>
        <Box>
          <Typography variant="body1">You chose: {userChoice}</Typography>
          <Typography variant="body1">Bot chose: {botChoice}</Typography>
        </Box>
      </Paper>
    </animated.div>
  );
};

ResultAnnouncement.propTypes = {
  showResult: PropTypes.bool.isRequired,
  winner: PropTypes.string.isRequired,
  userChoice: PropTypes.string,
  botChoice: PropTypes.string,
};

export default ResultAnnouncement;
