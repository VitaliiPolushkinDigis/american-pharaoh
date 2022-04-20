export enum ClientsTypes {
  FUNDRAISING = 'FUNDRAISING',
  MARKETING = 'MARKETING',
  SALES = 'SALES',
  ECOMMERCE = 'ECOMMERCE',
  ETS = 'ETS',
}

export interface OrganizationAPIModel {
  createdAt: string;
  id: string;
  logo: string;
  name: string;
  refId: null | string;
  updatedAt: string;
}
export interface VenueAPIModel {
  id: string;
  name: string;
  orgId: string;
  logo: string;
  subdomain: string;
  scaleoOfferId: number | null;
  clientType: ClientsTypes;
}

export interface VenueAttributesAPIModel {
  [key: string]: string;
}

export interface WebAppTipsModel {
  'tip-media-type': 'video' | 'image';
  'tip-media-url': string;
  'tip-text': string;
}
export interface WebappLoadingCardModel {
  'tip-media-type': 'video' | 'image';
  'tip-media-url': string;
  'tip-text': string;
}

export enum WebappDefaultStoryDetailsEditableValues {
  FULL = 'full',
  LIMITED = 'limited',
}
export interface WebappDefaultStoryDetails {
  ctaBtnLinkUrl: string;
  ctaBtnText: string;
  editable: WebappDefaultStoryDetailsEditableValues;
  metaDescription: string;
  metaTitle: string;
  videoText: string;
  webAppSettings: {
    metaTitle: boolean;
    videoText: boolean;
    ctaBtnText: boolean;
    ctaBtnLinkUrl: boolean;
  };
}

export interface WebappCard {
  mobile: {
    original: string | null;
    cropped: string | null;
  };
  desktop: {
    original: string | null;
    cropped: string | null;
  };
  tablet: {
    original: string | null;
    cropped: string | null;
  };
  title?: string;
  subtitle?: string;
}
export interface SharingSettings {
  Message: boolean;
  Email: boolean;
  Twitter: boolean;
  Instagram: boolean;
  Facebook: boolean;
  Link: boolean;
  LinkedIn: boolean;
}

export interface VenueProperties {
  'webapp.venue': {
    slug: string;
    'display-name': string;
    brandname: string;
    id: string;
  };
  'webapp.open-registration': boolean;
  'webapp.config': {
    'logo-img-url': string;
    'primary-color': string;
    'primary-light-color': string;
    'secondary-color': string;
    'text-color': string;
    'landing-card-url': string;
    'landing-card-text': string;
    'rewards-coming-soon-image': string;
  };
  'webapp.sharing': {
    'backlink-cta-text': 'Donate' | 'Product Page';
    'meta-og-image': string;
    'meta-og-title': string;
    'meta-og-description': string;
    'meta-twitter-img': string;
    'meta-twitter-title': string;
    'meta-twitter-description': string;
    'meta-twitter-site-id': string;
    sharingSettings: SharingSettings;
    sharingSMSNotInContacts: boolean;
  };
  'webapp.loading-cards': WebappLoadingCardModel | WebappLoadingCardModel[];
  'webapp.tips': WebAppTipsModel | WebAppTipsModel[];
  'webapp.welcome-video': string;
  'webapp.welcome-text': string[];
  'webapp.default-story-details': WebappDefaultStoryDetails;
  'webapp.cards-welcome': WebappCard;
  'webapp.cards-tip': WebappCard;
  'webapp.cards-edu': WebappCard;
}

export interface VenuePropsDTO {
  locale?: string;
  venueLogo?: string;
  metaOGUrl?: string;
  metaOGImg: string;
  metaOGVideo?: string;
  metaOGTitle: string;
  metaOGDescription: string;
  metaTwitterImg: string;
  metaTwitterTitle: string;
  metaTwitterDescription: string;
  metaTwitterSiteId: string;
}
