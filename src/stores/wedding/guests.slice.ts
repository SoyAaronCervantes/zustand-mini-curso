import {type StateCreator} from "zustand";
import {zustandMiddlewares} from "./index.ts";

type Guests = {
  guestsCount: number;
}

interface GuestsActions {
  setGuestsCount: (count: number) => void
}

export type GuestsSlice = Guests & GuestsActions;

export const createGuestsSlice: StateCreator<GuestsSlice, zustandMiddlewares> = (set): GuestsSlice => ({
  guestsCount: 0,
  setGuestsCount: (count: number) => set(state => {
    if (count < 0) return state;
    return { guestsCount: count };
  }, false, 'setGuestsCount'),
})
