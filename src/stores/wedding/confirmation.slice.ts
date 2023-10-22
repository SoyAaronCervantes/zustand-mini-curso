import {StateCreator} from "zustand";
import {zustandMiddlewares} from "./index.ts";

type Confirmation = {
  isConfirmed: boolean;
}

interface ConfirmationActions {
  setConfirmation: (isConfirmed: boolean) => void;
}

export type ConfirmationSlice = Confirmation & ConfirmationActions;

export const createConfirmationSlice: StateCreator<ConfirmationSlice, zustandMiddlewares> = (set): ConfirmationSlice => ({
  isConfirmed: false,
  setConfirmation: (isConfirmed: boolean) => set({isConfirmed}, false, 'setConfirmation'),
});
