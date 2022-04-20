export const BASE_URL = process.env.REACT_APP_BASE_API_URL;

export const AuthEndpoints = {
  GetUser: `${BASE_URL}/api/v1/users/:id`,
  RegisterUser: `${BASE_URL}/api/v1/users/register`,
  LoginUser: `${BASE_URL}/api/v1/auth`,
  UpdateUser: `${BASE_URL}/api/v1/users/:id`,
  RefreshToken: `${BASE_URL}/api/v1/auth/refresh`,
};

export const VenueEndpoints = {
  Venue: `${BASE_URL}/api/v1/venues/:id`,
  GetVenueProperties: `${BASE_URL}/api/v1/venues/:id/properties?prefix=webapp`,
  GetOrganizationById: `${BASE_URL}/api/v1/organizations/:id`,
};

export const getApiUrlForId = (apiUrl: string, id: string): string => {
  return apiUrl.replace(/:id/, id);
};
