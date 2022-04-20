import { FC, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

import { useStyles } from './Loader.helper';
import { useAxiosLoader } from '../../../services/hooks/loader';

export const Loader: FC = () => {
  const [loading, setLoading] = useState(true);
  const { progress, loading: loadingHook } = useAxiosLoader();
  const classes = useStyles({
    progress: Math.round(progress * 1.52),
    loading,
  });

  useEffect(() => {
    if (!loadingHook && progress === 100) {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  }, [loadingHook, progress]);

  return (
    <Box className={classes.wrapper}>
      <div style={{ position: 'relative' }}>
        <div
          className={[
            classes.logoContainer,
            progress === 100 ? [classes.animated, classes.animatedWithDelay].join(' ') : '',
          ].join(' ')}
        />
        <CircularProgress
          className={classes.progressBar}
          variant="determinate"
          value={progress}
          size={100}
          thickness={1}
        />
        <img className={classes.logoWrapper} src="/Vector.png" alt="loader " />
      </div>
    </Box>
  );
};
