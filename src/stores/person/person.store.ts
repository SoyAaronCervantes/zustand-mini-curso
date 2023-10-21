import {create, StateCreator} from "zustand";
import {devtools, persist} from "zustand/middleware";
// import {createFirebaseStorage,} from "../storages";

type Person = {
  name: string;
  lastName: string;
}

interface PersonActions {
  setName: (name: string) => void;
  setLastName: (lastName: string) => void;
}

type PersonStore = Person & PersonActions;

const personStateCreator: StateCreator<PersonStore, [['zustand/devtools', unknown]]> = (set) => ({
  name: '',
  lastName: '',
  setName: (name: string) => set(({name}), false, 'setName'),
  setLastName: (lastName: string) => set(({lastName}), false, 'setLastName'),
})


export const usePersonStore = create<PersonStore>()(
  devtools(
    persist(personStateCreator, {
      name: 'person',
      // storage: createFirebaseStorage,
      // storage: createSessionStorage,
    })
  )
);
