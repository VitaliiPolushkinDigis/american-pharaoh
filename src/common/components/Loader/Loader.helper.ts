import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles<Theme, { loading: boolean; progress: number }>((theme) => ({
  wrapper: (props) => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.snackbar,
    backgroundColor: theme.palette.common.black,
    opacity: props.loading ? 1 : 0,
    visibility: props.loading ? 'visible' : 'hidden',
    transition: 'visibility 2s, opacity 0.6s',
  }),
  container: {
    position: 'relative',
    marginTop: 17,
    width: 100,
    height: 17,
  },
  text: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clip: 'rect(0, 152px, 17px, 0)',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clip: (props) => `rect(0, 152px, 17px, ${props.progress}px`,
    backfaceVisibility: 'hidden',
    transition: 'clip 0.3s',
  },
  progressBar: {
    position: 'fixed',
    color: '#9EB1CF',
    top: 'calc(50% - 50px)',
    left: 'calc(50% - 50px)',
  },
  logoContainer: {
    backgroundColor: '#292D32',
    color: '#292D32',
    position: 'fixed',
    top: 'calc(50% - 50px)',
    left: 'calc(50% - 50px)',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  logoWrapper: {
    position: 'fixed',
    top: 'calc(50% - 25px)',
    left: 'calc(50% - 25px)',
    objectFit: 'contain',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  '@keyframes waves': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },

    '100%': {
      transform: 'scale(8)',
      opacity: 0,
    },
  },
  animated: {
    animation: `$waves 2.5s linear`,
    animationDelay: '.01s',
  },
  animatedWithDelay: {
    animation: `$waves 2.5s linear`,
    animationDelay: '.350s',
  },
}));
