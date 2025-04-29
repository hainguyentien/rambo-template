import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/auth';
import { client } from '../client';
import { ENDPOINTS } from '../endpoints';

// Login user
export async function loginUser(credentials: LoginRequest) {
  return await client.post<LoginRequest, LoginResponse>(
    ENDPOINTS.AUTH.LOGIN,
    credentials
  );
}

// Register user
export async function registerUser(userData: RegisterRequest) {
  return await client.post<RegisterRequest, RegisterResponse>(
    ENDPOINTS.AUTH.REGISTER,
    userData
  );
}

// Forgot password
export async function forgotPassword(email: string) {
  return await client.post<{ email: string }, { success: boolean }>(
    ENDPOINTS.AUTH.FORGOT_PASSWORD,
    { email }
  );
}
