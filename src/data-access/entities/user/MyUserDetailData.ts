import "server-only";

import { authData } from "@/data-access/entities/auth/AuthData";
import { prisma } from "@/data-access/infra/prisma";

class MyUserDetailData {
  public async findOne() {
    const userId = await authData.getUserId();

    if (userId == null) {
      return undefined;
    }

    const userDetail = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {},
    });

    return userDetail;
  }
}

export const myUserDetailData = new MyUserDetailData();
