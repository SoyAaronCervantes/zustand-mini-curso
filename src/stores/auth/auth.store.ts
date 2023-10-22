import {create} from "zustand";
import {authState, AuthStore} from "./auth.state.ts";
import {devtools, persist} from "zustand/middleware";

export type zustandMiddlewares = [["zustand/devtools", never], ["zustand/persist", unknown]];
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      authState, {name: 'auth'}
    ), { name: 'auth' }
  )
)
