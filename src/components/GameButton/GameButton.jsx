import React from 'react';
import { Button } from '@mui/material';
import RockIcon from '@mui/icons-material/Flare';
import PaperIcon from '@mui/icons-material/Description';
import ScissorsIcon from '@mui/icons-material/ContentCut';
import PropTypes from 'prop-types';

const GameButton = ({ choice, onClick, disabled }) => {
  const icons = {
    rock: <RockIcon fontSize="large" />,
    paper: <PaperIcon fontSize="large" />,
    scissors: <ScissorsIcon fontSize="large" />,
  };

  return (
    <Button
      variant="contained"
      onClick={() => onClick(choice)}
      disabled={disabled}
      className={`button-${choice}`}
    >
      {icons[choice]}
    </Button>
  );
};

GameButton.propTypes = {
  choice: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default GameButton;
