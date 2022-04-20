export interface AuthRequestBody {
    venueId?: string;
    name?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    instagramHandle?: string;
    returnUrl?: string;
    refId?: string;
    photoUrl?: string;
    defaultStoryDetails?: {
      metaTitle: string;
      videoText: string;
      ctaBtnText: string;
      ctaBtnLinkUrl: string;
    };
  }
  
  export enum UserStatuses {
    active = 'ACTIVE',
    inactive = 'INACTIVE',
    archived = 'ARCHIVED',
  }
  
  export interface StoryDetails {
    ctaBtnLinkUrl: string;
    ctaBtnText: string;
    editable?: string;
    metaDescription: string;
    metaTitle: string;
    videoText: string;
    webAppSettings?: {
      metaTitle: boolean;
      videoText: boolean;
      ctaBtnText: boolean;
      ctaBtnLinkUrl: boolean;
    };
  }
  
  export interface UserModel {
    venueId: string;
    id: string;
    name: string;
    email: string;
    photoUrl: string;
    phoneNumber: string;
    instagramHandle: string;
    points: number;
    campaignPoints: number;
    returnUrl: string;
    scaleoAffiliateId: number | null;
    displayName: string | null;
    status: UserStatuses | '';
    defaultStoryDetails: StoryDetails | null;
  }
  
  export interface MeApiModel {
    user: UserModel;
    accessToken: string;
    refreshToken: string;
  }
  
  export interface ExistUserRequestBody {
    venueId: string;
    email: string;
  }
  export interface ExistUserApiModel {
    exists: boolean;
  }
  
  export interface ForgotPasswordRequest {
    email: string;
    venueId: string;
  }
  
  export interface ResetPasswordRequest {
    newPassword: string;
    token: string;
  }
  