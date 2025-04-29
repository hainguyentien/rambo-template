export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  avatar?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
}
