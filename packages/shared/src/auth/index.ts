export const JWT_COOKIE_NAME = "auth-token";

export type JwtPayload = {
  userId: string;
  email: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  poorName: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    id: string;
    email: string;
    poorName: string;
    points: number;
    level: number;
  };
};
