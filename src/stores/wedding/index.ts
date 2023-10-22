import {create} from "zustand";
import {devtools} from "zustand/middleware";

import {createPersonSlice, type PersonSlice} from "./person.slice.ts";
import {createGuestsSlice, type GuestsSlice} from "./guests.slice.ts";
import {createEventSlice, type EventSlice} from "./date.slice.ts";
import {createConfirmationSlice, type ConfirmationSlice} from "./confirmation.slice.ts";

type WeddingStore = PersonSlice & GuestsSlice & EventSlice & ConfirmationSlice;
export type zustandMiddlewares = [["zustand/devtools", never]];

export const useWeddingBounceStore = create<WeddingStore>()(
  devtools(
    (...a) => ({
      ...createPersonSlice(...a),
      ...createGuestsSlice(...a),
      ...createEventSlice(...a),
      ...createConfirmationSlice(...a)
    })
  )
);
