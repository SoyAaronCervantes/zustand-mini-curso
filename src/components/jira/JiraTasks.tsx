import {DragEvent, useState} from 'react';
import {IoAddOutline, IoCheckmarkCircleOutline} from 'react-icons/io5';
import type {Task, TaskStatus} from "../../types";
import {SingleTask} from "./SingleTask.tsx";
import {useTaskStore} from "../../stores";
import classNames from 'classnames';
import swal from 'sweetalert2';

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
  const isDragging = useTaskStore( state => !!state.draggingTaskId );
  const addTask = useTaskStore( state => state.addTask );
  const onTaskDrop = useTaskStore( state => state.onTaskDrop );
  const [onDragOver, setOnDragOver] = useState(false)

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  }
  const handleDragLeave = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  }
  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    onTaskDrop( status );
  }

  const handleAddTask = async (status: TaskStatus) => {
    const { isConfirmed, value } = await swal.fire({
      title: `Add new task to ${status}`,
      input: 'text',
      inputLabel: 'Task name',
      inputPlaceholder: 'Enter you new task name',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return 'You need to write something!';
      }
    })
    if (!isConfirmed) return;
    addTask(value, status);
  }

  return (
    <article
      onDragOver={ (event) => handleDragOver(event)}
      onDragLeave={ (event) => handleDragLeave(event)}
      onDrop={ (event) => handleDrop(event)}
      className={
        classNames(
          '!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]',
          {'border-dotted border-blue-400': isDragging},
          {'border-dotted border-green-400': isDragging && onDragOver},
        )
      }>
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
        <button onClick={ () => handleAddTask(status) }>
          <IoAddOutline />
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
