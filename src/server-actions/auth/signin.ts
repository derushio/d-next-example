'use server';

import { authData } from '@/data-access/entities/auth/AuthData';
import { User } from '@prisma/client';
import { zfd } from 'zod-form-data';

type State = {
  user?: User;
  error?: Error;
};

export async function signin(
  currentState: State,
  formData: FormData,
): Promise<State> {
  try {
    const fdata = zfd
      .formData({
        email: zfd.text(),
        password: zfd.text(),
      })
      .parse(formData);

    const user = await authData.signin(fdata);
    return {
      user: user,
    };
  } catch (e) {
    return {
      error: e as Error,
    };
  }
}
