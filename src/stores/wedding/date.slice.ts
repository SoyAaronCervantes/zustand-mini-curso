import type {StateCreator} from "zustand";
import type {zustandMiddlewares} from "./index.ts";

type Event = {
  eventDate: number;
}

interface EventActions {
  getEventDate: () => string,
  getEventTime: () =>  string,
  setEventDate: (date: string) => void,
  setEventTime: (time: string) => void,
}

export type EventSlice = Event & EventActions;

export const createEventSlice: StateCreator<EventSlice, zustandMiddlewares> = (set, get): EventSlice => ({
  eventDate: Date.now(),
  getEventDate: () => {
    const eventDate = get().eventDate;
    const date = new Date(eventDate);
    return date.toISOString().split('T').at(0)!;
  },
  getEventTime: () => {
    const eventDate = get().eventDate;
    const date = new Date(eventDate);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },
  setEventDate: (value: string) => set( state => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate() + 1;
    const newDate = new Date(state.eventDate);
    newDate.setFullYear(year, month, day);
    const eventDate = newDate.getTime();
    return {eventDate};
  }, false, 'setEventDate'),
  setEventTime: (time: string) => set( state => {
    const [hours,minutes] = time.split(':');
    const hoursParsed = parseInt(hours, 10);
    const minutesParsed = parseInt(minutes, 10);
    const newDate = new Date(state.eventDate);
    newDate.setHours(hoursParsed, minutesParsed, 0, 0);
    const eventDate = newDate.getTime();
    return { eventDate }
  }, false, 'setEventTime')
});
