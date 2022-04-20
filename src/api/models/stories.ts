export interface StoriesApiModel {
    categoryName: string;
    url: string;
    venueId: string;
    categoryId: string;
    userId: string;
    id: string;
    returnUrl: string;
    isPublic: boolean;
    views: number;
    ctaClicks: number;
    shortcode: string;
    stockAudioId: string | null;
    stockVideoId: string | null;
    createdAt: string;
    uri: string;
    thumbnailUrl?: string;
    cloudinaryUrl: string;
    userScaleoAffiliateId: number;
  }
  