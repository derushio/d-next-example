'use server';

import { jwtData } from '@/data-access/entities/auth/JwtData';

type State = {
  error?: Error;
};

export async function resetToken(
  currentState: State,
  formData: FormData,
): Promise<State> {
  currentState;
  formData;

  try {
    await jwtData.resetToken();
    return {};
  } catch (e) {
    return {
      error: e as Error,
    };
  }
}
