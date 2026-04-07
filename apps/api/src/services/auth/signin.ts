import bcrypt from "bcrypt";
import { prisma } from "@repo/db";
import type { AuthResponse } from "@repo/shared";

type SignInParams = {
  email: string;
  password: string;
};

export async function signIn({
  email,
  password,
}: SignInParams): Promise<{ user: AuthResponse["user"] } | { error: string }> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      poorName: user.poorName,
      points: user.points,
      level: user.level,
    },
  };
}
