import { Theme } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    paddingBottom: 0,

    [theme.breakpoints.up('lg')]: {
      paddingBottom: 0,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(3),

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(5),
    },
  },
}));
