import { IoCheckmarkCircleOutline, IoEllipsisHorizontalOutline } from 'react-icons/io5';
import type {Task, TaskStatus} from "../../types";
import {SingleTask} from "./SingleTask.tsx";

interface Props {
  title: string;
  tasks: Task[];
  value: TaskStatus;
}


export const JiraTasks = ({ title, tasks }: Props) => {
  return (
    <article className="!text-black relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]">


      {/* Task Header */ }
      <article className="relative flex flex-row justify-between">
        <article className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={ { fontSize: '50px' } } />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{ title }</h4>
        </article>
        <button>
          <IoEllipsisHorizontalOutline />
        </button>

      </article>

      {/* Task Items */ }
      <aside className="h-full w-full">
        {
          tasks.map( task => <SingleTask key={task.id} task={ task } />)
        }
      </aside>
    </article>
  );
};
