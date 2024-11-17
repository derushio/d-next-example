import 'server-only';

import { jwtData } from '@/data-access/entities/auth/JwtData';
import { prisma } from '@/data-access/infra/prisma';
import bcrypt from 'bcrypt';

export const AuthDataErrors = {
  USER_NOT_FOUND: 'User not found.',
} as const;

class AuthData {
  public async signin(params: { email: string; password: string }) {
    const secret = await prisma.userSecret.findUnique({
      where: {
        email: params.email,
      },
    });

    if (!secret) {
      throw new Error(AuthDataErrors.USER_NOT_FOUND);
    }

    const signinSucceed = await bcrypt.compare(
      params.password,
      secret.passwordHash,
    );

    if (!signinSucceed) {
      throw new Error(AuthDataErrors.USER_NOT_FOUND);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: secret.userId,
      },
    });

    if (!user) {
      throw new Error(AuthDataErrors.USER_NOT_FOUND);
    }

    await jwtData.sign(user.id);
    return user;
  }

  public async getUserId() {
    const jwt = await jwtData.verify();
    return jwt?.payload.sub ?? undefined;
  }
}

export const authData = new AuthData();
