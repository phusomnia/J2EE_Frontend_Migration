import { URL } from '@/features/constants';

export type SignInData = {
  username: string;
  password: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function useSignIn(data: SignInData): Promise<ApiResponse<object>> {
  const response = await fetch(`${URL}/api/v1/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw error;
  }

  return response.json();
}
