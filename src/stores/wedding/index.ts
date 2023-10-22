import {create} from "zustand";
import {devtools} from "zustand/middleware";

import {createPersonSlice, type PersonSlice} from "./person.slice.ts";
import {createGuestsSlice, type GuestsSlice} from "./guests.slice.ts";

type WeddingStore = PersonSlice & GuestsSlice;
export type zustandMiddlewares = [["zustand/devtools", never]];

export const useWeddingBounceStore = create<WeddingStore>()(
  devtools(
    (...a) => ({
      ...createPersonSlice(...a),
      ...createGuestsSlice(...a),
    })
  )
);
