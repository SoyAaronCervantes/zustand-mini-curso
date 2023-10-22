import {type StateCreator} from "zustand";
import {type zustandMiddlewares} from "./index.ts";

type Person = {
  name: string;
  lastName: string;
}

interface PersonActions {
  setName: (name: string) => void;
  setLastName: (lastName: string) => void;
}

export type PersonSlice = Person & PersonActions;

export const createPersonSlice: StateCreator<PersonSlice, zustandMiddlewares> = (set): PersonSlice => ({
  name: '',
  lastName: '',
  setName: (name: string) => set({name}, false, 'setName'),
  setLastName: (lastName: string) => set({lastName}, false, 'setName'),
})
