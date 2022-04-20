import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

import { useStyles } from './Layout.helper';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  // TODO: Find better way to hide bottom nav in cases of story/video upload
  const classes = useStyles();

  return (
    <>
      <Box
        className={classes.wrapper}
        display="flex"
        flexDirection="column"
        minHeight="var(--app-height)"
      >
        <div className={classes.container}>{children}</div>
      </Box>
    </>
  );
};
