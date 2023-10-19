import { create } from 'zustand';

type Bear = {
  id: number;
  type: 'black' | 'panda' | 'polar';
  name: string;
}

interface BearsStore {
  bears: Bear[];
  blackBears: number;
  pandaBears: number;
  polarBears: number;
  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
  increaseBlackBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  computed: {
    totalBears: number;
  }
}

const initialBear : Bear = {
  id: 1,
  type: 'black',
  name: 'Black bear #1'
}

export const useBearStore = create<BearsStore>()((set, get) => ({
  blackBears: 25,
  pandaBears: 10,
  polarBears: 12,
  bears: [initialBear],

  addBear: () => (set( state => ({
    bears: [
      ...state.bears,
      { id: state.bears.length + 1, type: 'panda', name: `Panda bear #${state.bears.length + 1 }`}
    ]
  }))),
  doNothing: () => (set( state => ({ bears: [...state.bears] }) )),
  clearBears: () => (set( { bears: [] })),


  increaseBlackBears: (by: number) => (set( (state) => ({ blackBears: state.blackBears += by }) )),
  increasePandaBears: (by: number) => (set( (state) => ({ pandaBears: state.pandaBears += by }) )),
  increasePolarBears: (by: number) => (set( (state) => ({ polarBears: state.polarBears += by }) )),

  computed: {
    get totalBears(): number { return get().blackBears + get().pandaBears + get().polarBears }
  }
}));
