import { defaultVenueSubDomain } from '../api/constants';

export const getSubdomain = (route?: string) => {
    if (route) {
      return route.split('.')[1] ? route.split('.')[0] : defaultVenueSubDomain;
    }
    if (typeof window !== 'undefined') {
      return window.location.host.split('.')[1] ? window.location.host.split('.')[0] : defaultVenueSubDomain;
    }
    return '';
  };