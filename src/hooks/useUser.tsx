import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateProfileRequest } from '../types/user';
import { getUserProfile, updateUserProfile } from '@/api/services/userApi';

export function useUserProfile() {
  return useQuery({
    queryKey: ['getUserProfile'],
    queryFn: getUserProfile,
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUserProfile'] });
    },
    onError: error => {
      console.log('Update profile error:', error);
    },
  });
}
