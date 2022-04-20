import { FC, ReactNode, useEffect } from 'react';
import { ThemeProvider, Theme } from '@mui/material';

import { useAppDispatch, useTypedSelector } from '../../../store/store';
import { getVenue, getProperties } from '../../../store/slices/venue';
// import { getActiveCampaign } from '../../../store/slices/rewards';
// import { getUserRequest } from '../../../store/slices/me';
// import { httpClient } from '../../../services/httpClient/httpClient';
import { getAlteredTheme } from '../../../services/hooks/themeHook';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

interface InitialContainerProps {
  children: ReactNode;
}

export const InitialContainer: FC<InitialContainerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { venue, venueAttributes } = useTypedSelector((state) => state.venue);
  const alteredTheme = getAlteredTheme(venueAttributes);

  useEffect(() => {
    dispatch(getVenue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // const userId = httpClient.getUserId();

    if (venue.id) {
      dispatch(getProperties(venue.id));
      //   if (userId) {
      //     dispatch(getUserRequest(userId));
      //   }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venue.id]);

  return <ThemeProvider theme={alteredTheme}>{children}</ThemeProvider>;
};
