'use client';

import { Button, styled } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

const UploadButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  padding: `${theme.spacing(2.5)} ${theme.spacing(2)}`,
  fontSize: '1em',
}));

export default UploadButton;
