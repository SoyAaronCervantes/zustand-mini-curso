import {create} from "zustand";

type Person = {
  name: string;
  lastName: string;
}

interface PersonActions {
  setName: (name: string) => void;
  setLastName: (lastName: string) => void;
}

type PersonStore = Person & PersonActions;

export const usePersonStore = create<PersonStore>()(set => ({
  name: '',
  lastName: '',
  setName: (name: string) => set(state => ({ name })),
  setLastName: (lastName: string) => set(state => ({ lastName })),
}));
