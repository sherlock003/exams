'use client';

import { Button, styled } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import { lightGreen } from '@mui/material/colors';

const SubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(lightGreen[500]),
  backgroundColor: lightGreen[400],
  padding: `${theme.spacing(2.5)} ${theme.spacing(2)}`,
  fontSize: '1em',
  '&:hover': {
    backgroundColor: lightGreen[600],
  },
}));

export default SubmitButton;
