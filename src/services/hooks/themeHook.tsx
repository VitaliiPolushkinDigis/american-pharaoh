import { createCustomTheme, theme } from '../../theme';
import { VenueAttributesDTO } from '../../store/storeModels';

export const getAlteredTheme = (venueAttributes: VenueAttributesDTO) => {
  if (!venueAttributes) {
    return theme;
  }

  const primaryColor = venueAttributes.properties?.['webapp.config']?.['primary-color'];
  const secondaryColor = venueAttributes.properties?.['webapp.config']?.['secondary-color'];
  const textColor = venueAttributes.properties?.['webapp.config']?.['text-color'];

  return createCustomTheme({
    primaryColor,
    secondaryColor,
    textColor,
  });
};
