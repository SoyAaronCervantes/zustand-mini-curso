import {create} from "zustand";
import {authStateCreator, AuthStore} from "./auth.state.ts";
import {devtools} from "zustand/middleware";

export type zustandMiddlewares = [["zustand/devtools", never]];
export const useAuthStore = create<AuthStore>()(
  devtools(authStateCreator)
)
