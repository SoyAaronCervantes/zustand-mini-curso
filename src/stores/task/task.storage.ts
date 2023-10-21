import type {Task, TaskStatus} from "../../types";
import {create, StateCreator} from "zustand";
import {devtools} from "zustand/middleware";

interface TaskStorage {
  tasks: Record<string, Task>,
  draggingTaskId?: string;
}

interface Actions {
  getTasksByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (id: string) => void;
  removeDraggingTaskId: () => void;
}

type TaskStore = TaskStorage & Actions;

const storeApi: StateCreator<TaskStore, [["zustand/devtools", never]]> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    '1': {
      id: '1',
      title: 'Task 1',
      status: 'open',
    },
    '2': {
      id: '2',
      title: 'Task 2',
      status: 'progress',
    },
    '3': {
      id: '3',
      title: 'Task 3',
      status: 'open',
    },
    '4': {
      id: '4',
      title: 'Task 4',
      status: 'open',
    },
    '5': {
      id: '5',
      title: 'Task 5',
      status: 'open',
    }
  },
  getTasksByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    const values = Object.values(tasks);
    return values.filter(task => task.status === status);
  },
  setDraggingTaskId: (id: string) => set({draggingTaskId: id}, false, 'setDraggingTaskId'),
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }, false, 'removeDraggingTaskId')
})


export const useTaskStore = create<TaskStore>()(
  devtools(storeApi)
);
