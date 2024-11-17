import 'server-only';

import { cookieData } from '@/data-access/entities/auth/CookieData';
import { Env } from '@/data-access/entities/env/Env';
import { differenceInHours } from 'date-fns';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import parse from 'parse-duration';

class JwtData {
  private secret = new TextEncoder().encode(Env.JWT_SECRET);

  public async sign(userId: string) {
    const token = await new SignJWT({ sub: userId })
      .setProtectedHeader({ alg: Env.JWT_ALG })
      .setIssuedAt()
      .setExpirationTime(Env.JWT_EXPIRATION_TIME)
      .sign(this.secret);

    const cookieStore = await cookies();
    cookieStore.set({
      value: token,
      ...cookieData.authCookiePolicy,
    });
    return token;
  }

  public async verify() {
    const cookieStore = await cookies();
    const token = cookieStore.get(cookieData.authCookiePolicy.name);

    if (!token) {
      return null;
    }

    const data = await jwtVerify(token.value, this.secret);
    return data;
  }

  public async resetToken() {
    let data = await this.verify();

    if (!data || data.payload.exp == null || data.payload.sub == null) {
      return null;
    }

    // reset token 期間の半分を切ってたらリセットする
    if (
      (parse(Env.JWT_EXPIRATION_TIME, 'h') ?? 0) / 2 >
      differenceInHours(new Date(data.payload.exp * 1000), new Date())
    ) {
      console.info('RESET TOKEN');
      const token = await this.sign(data.payload.sub);
      data = await jwtVerify(token, this.secret);
      if (data.payload.exp == null || data.payload.sub == null) {
        return null;
      }
    }

    return data;
  }
}

export const jwtData = new JwtData();
