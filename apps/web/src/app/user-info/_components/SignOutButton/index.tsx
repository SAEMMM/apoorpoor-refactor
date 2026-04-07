"use client";

import Button from "@/shared/ui/Button";
import { signOutAction } from "@/features/auth/actions/signOut";

export const SignOutButton = () => {
  return (
    <Button colorVariant="gray" onClick={() => signOutAction()}>
      로그아웃
    </Button>
  );
};
