import { VenueAPIModel, VenueProperties } from '../api/models/venue';

export interface VenueDTO extends VenueAPIModel {
    isLoading: boolean;
    error: boolean;
    lastUpdated: string;
  }
  
  export interface VenueAttributesDTO {
    isLoading: boolean;
    error: boolean;
    lastUpdated: string;
    properties: Partial<VenueProperties>;
  }