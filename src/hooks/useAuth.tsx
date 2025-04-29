import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginRequest, RegisterRequest } from '../types/auth';
import {
  forgotPassword,
  loginUser,
  registerUser,
} from '@/api/services/authApi';

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: LoginRequest) => loginUser(credentials),
    onSuccess: data => {
      // Store auth token or user data
      // SecureStore.setItemAsync('authToken', data.token);

      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => {
      console.error('Login error:', error);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (userData: RegisterRequest) => registerUser(userData),
    onSuccess: data => {
      console.log('Registration successful', data);
    },
    onError: error => {
      console.error('Registration error:', error);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: () => {
      console.log('Password reset email sent');
    },
    onError: error => {
      console.error('Forgot password error:', error);
    },
  });
}
