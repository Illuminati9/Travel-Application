// AuthContext.ts
import { Dispatch, SetStateAction, createContext } from "react";

export type AuthType = {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<{
  auth: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType>>;
}>({
  auth: { accessToken: null, isLoggedIn: false, refreshToken: null },
  setAuth: () => {},
});
