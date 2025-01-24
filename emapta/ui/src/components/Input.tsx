'use client';

import * as React from 'react';

import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

type RootProps = {
  hasError?: boolean;
};

const Input = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== 'hasError',
})<RootProps>(({ theme, hasError }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F3F6F9',
    border: '1px solid',
    borderWidth: 2,
    borderColor: hasError ? theme.palette.error.main : '#E0E3E7',
    fontSize: 16,
    // width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      // boxShadow: `${alpha(hasError ? theme.palette.error.main : theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: hasError
        ? theme.palette.error.main
        : theme.palette.primary.main,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
    }),
  },
}));

export default React.memo(Input);
