import type {AuthStatus, User} from "../../types";
import {StateCreator} from "zustand";
import {zustandMiddlewares} from "./auth.store.ts";

type Auth = {
  status: AuthStatus;
  token: string | null;
  user: User | null;
}

export type AuthStore = Auth;

export const authStateCreator: StateCreator<AuthStore, zustandMiddlewares> = () => ({
  status: 'unauthorized',
  token: null,
  user: null,
})
