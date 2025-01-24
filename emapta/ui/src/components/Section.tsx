'use client';

import { memo, PropsWithChildren } from 'react';

import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

type Props = {
  title: string;
};

const Section = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <div>
      <Typography variant="h6" component="h4" sx={{ color: '#ABABAB' }}>
        {title}
      </Typography>
      <Divider />

      {children}
    </div>
  );
};

export default memo(Section);
