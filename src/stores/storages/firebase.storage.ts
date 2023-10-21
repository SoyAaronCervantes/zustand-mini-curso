import {createJSONStorage, type StateStorage} from "zustand/middleware";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const FIREBASE_URL = 'https://zustand-storage-d4216-default-rtdb.firebaseio.com';
const controller = new AbortController();
const signal = controller.signal;

const firebaseStateStorage: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${FIREBASE_URL}/${name}.json`)
        .then((res) => res.json());
      return JSON.stringify(data);
    } catch (e) {
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    if (controller) controller.abort('Request aborted, new changes was made');

    await fetch(`${FIREBASE_URL}/${name}.json`, {
      method: 'PUT',
      body: value,
      signal: signal,
    })
      .then((res) => res.json());
  },
  removeItem: function (name: string): void {
    sessionStorage.removeItem(name);
  }
}

export const createFirebaseStorage = createJSONStorage( () => firebaseStateStorage)
