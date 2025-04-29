import type { UpdateProfileRequest, UserProfile } from '@/types/user';
import { ENDPOINTS } from '../endpoints';
import { client } from '../client';

// Get user profile
export async function getUserProfile() {
  return await client.get<UserProfile>(ENDPOINTS.USER.PROFILE);
}

// Update user profile
export async function updateUserProfile(data: UpdateProfileRequest) {
  return await client.put<UpdateProfileRequest, UserProfile>(
    ENDPOINTS.USER.UPDATE_PROFILE,
    data
  );
}
