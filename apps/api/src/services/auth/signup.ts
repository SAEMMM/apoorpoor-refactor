import bcrypt from "bcrypt";
import { prisma } from "@repo/db";
import type { AuthResponse } from "@repo/shared";

type SignUpParams = {
  email: string;
  password: string;
  poorName: string;
};

export async function signUp({
  email,
  password,
  poorName,
}: SignUpParams): Promise<{ user: AuthResponse["user"] } | { error: string }> {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return { error: "이미 사용 중인 이메일입니다." };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      poorName,
      ledger: {
        create: {
          name: `${poorName}의 가계부`,
        },
      },
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      poorName: user.poorName,
    },
  };
}
