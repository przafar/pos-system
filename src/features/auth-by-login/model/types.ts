export type LoginResponse = {
  token: string;
  user?: { id: string; name: string };
};