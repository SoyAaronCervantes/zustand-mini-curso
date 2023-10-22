import type {Task, TaskStatus} from "../../types";
import {create, StateCreator} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
// import {produce} from "immer";

type TaskStorage = {
  tasks: Record<string, Task>,
  draggingTaskId?: string;
}

interface Actions {
  getTasksByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (id: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (id: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  addTask: (title: string, status: TaskStatus) => void;
}

type TaskState = TaskStorage & Actions;
type zustandMiddlewares = [ ["zustand/devtools", never], ["zustand/immer", never] ];

const storeApi: StateCreator<TaskState, zustandMiddlewares> = (set, get) => ({
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
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }, false, 'removeDraggingTaskId'),
  changeTaskStatus: (id, status) => {
    const task: Task = { ...get().tasks[id] };
    task.status = status;
    set( state => { state.tasks[id] = task }, false, 'changeTaskStatus')
  },
  onTaskDrop: (status) => {
    const taskId = get().draggingTaskId;
    if ( !taskId ) return;
    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
  addTask: (title, status) => {
    const id = crypto.randomUUID();
    const task: Task = { id, title, status };
    set( state => { state.tasks[task.id] = task }, false, 'addTask')
  }
})


export const useTaskStore = create<TaskState>()(
  devtools(
    immer(storeApi)
  )
);
