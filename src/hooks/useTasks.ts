import {useTaskStore} from "../stores";
import {TaskStatus} from "../types";
import swal from "sweetalert2";

export const useTasks = () => {
  const addTask = useTaskStore( state => state.addTask );

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
  return { handleAddTask }
}
