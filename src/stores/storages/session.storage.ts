import {createJSONStorage, type StateStorage} from "zustand/middleware";

const sessionStateStorage: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    const data = sessionStorage.getItem(name);
    return data ?? null;
  },
  setItem: function (name: string, value: string): void {
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): void {
    sessionStorage.removeItem(name);
  }
}

export const createSessionStorage = createJSONStorage( () => sessionStateStorage)
