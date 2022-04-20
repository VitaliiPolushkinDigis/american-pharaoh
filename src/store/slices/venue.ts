import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VenueAttributesDTO, VenueDTO } from '../storeModels';
import { httpClient } from '../../services/httpClient/httpClient';
import { getSubdomain } from '../../services/utilities';
import { getApiUrlForId, VenueEndpoints } from '../../api/endpoints';
import { VenueAPIModel, VenueProperties } from '../../api/models/venue';

export enum ClientsTypes {
    FUNDRAISING = 'FUNDRAISING',
    MARKETING = 'MARKETING',
    SALES = 'SALES',
    ECOMMERCE = 'ECOMMERCE',
    ETS = 'ETS',
  }
  

interface VenueSlice {
  venueAttributes: VenueAttributesDTO;
  venue: VenueDTO;
}

export const initialVenueState: VenueSlice = {
  venueAttributes: {
    properties: {},
    error: false,
    isLoading: true,
    lastUpdated: new Date().toISOString(),
  },
  venue: {
    clientType: ClientsTypes.FUNDRAISING,
    id: '',
    logo: '',
    name: '',
    orgId: '',
    subdomain: '',
    error: false,
    isLoading: true,
    lastUpdated: new Date().toISOString(),
    scaleoOfferId: null,
  },
};

export const getVenue = createAsyncThunk('venue/getVenue', async (_options: undefined, { rejectWithValue }) => {
  const subdomain = getSubdomain();
  try {
    return await httpClient.get<undefined, VenueAPIModel>({
      url: getApiUrlForId(VenueEndpoints.Venue, subdomain),
      requiresToken: false,
    });
  } catch (error) {
    // @ts-ignore
    return rejectWithValue(error.response.data.message);
  }
});

export const getProperties = createAsyncThunk('venue/getProperties', async (_options: string, { rejectWithValue }) => {
  try {
    return await httpClient.get<undefined, VenueProperties>({
      url: getApiUrlForId(VenueEndpoints.GetVenueProperties, _options),
      requiresToken: false,
    });
  } catch (error) {
    // @ts-ignore
    return rejectWithValue(error.response.data.message);
  }
});

const venueSlice = createSlice({
  name: 'venue',
  initialState: initialVenueState,
  reducers: {
    reset: () => initialVenueState,
  },
  extraReducers: (reducersBuilder) => {
    reducersBuilder.addCase(getVenue.rejected, (state) => {
      state.venue.error = true;
      state.venue.isLoading = false;
    });
    reducersBuilder.addCase(getVenue.pending, (state) => {
      state.venue.isLoading = true;
      state.venue.error = false;
    });
    reducersBuilder.addCase(getVenue.fulfilled, (state, { payload }) => {
      state.venue.isLoading = false;
      state.venue.error = false;
      state.venue.id = payload.id;
      state.venue.name = payload.name;
      state.venue.orgId = payload.orgId;
      state.venue.logo = payload.logo;
      state.venue.subdomain = payload.subdomain;
      state.venue.scaleoOfferId = payload.scaleoOfferId;
      state.venue.clientType = payload.clientType;
    });
    reducersBuilder.addCase(getProperties.rejected, (state) => {
      state.venueAttributes.error = true;
      state.venueAttributes.isLoading = false;
    });
    reducersBuilder.addCase(getProperties.pending, (state) => {
      state.venueAttributes.isLoading = true;
      state.venueAttributes.error = false;
    });
    reducersBuilder.addCase(getProperties.fulfilled, (state, { payload }) => {
      state.venueAttributes.isLoading = false;
      state.venueAttributes.error = false;
      state.venueAttributes.lastUpdated = new Date().toISOString();
      state.venueAttributes.properties = payload;
    });
  },
});

export const { reset } = venueSlice.actions;
export default venueSlice.reducer;
