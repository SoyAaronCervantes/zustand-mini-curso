import type {AuthStatus, User} from "../../types";
import {StateCreator} from "zustand";
import {zustandMiddlewares} from "./auth.store.ts";
import {AuthService} from "../../services/auth.service.ts";

type Auth = {
  status: AuthStatus;
  token: string | null;
  user: User | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
}

export type AuthStore = Auth & AuthActions;

export const authState: StateCreator<AuthStore, zustandMiddlewares> = (set) => ({
  status: 'unauthorized',
  token: null,
  user: null,
  login: async (email, password) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: 'authorized', token, user }, false, 'login [authorized]');
    } catch (e) {
      set({ status: 'unauthorized', token: null, user: null }, false, 'login [unauthorized]');
      throw 'Unauthorized';
    }
  }
})
