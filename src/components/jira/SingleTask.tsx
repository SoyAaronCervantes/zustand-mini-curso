import type {Task} from "../../types";
import {IoReorderTwoOutline} from "react-icons/io5";
import {useTaskStore} from "../../stores";

interface Props {
  task: Task;
}

export const SingleTask = ({task}: Props) => {
  const setDraggingTaskId = useTaskStore(state => state.setDraggingTaskId);
  const removeDraggingTaskId = useTaskStore(state => state.removeDraggingTaskId);

  return (
    <article
      draggable
      onDragStart={() => setDraggingTaskId(task.id)}
      onDragEnd={removeDraggingTaskId}
      className="mt-5 flex items-center justify-between p-2">
      <h3 className="text-base font-bold text-navy-700 items-center justify-center gap-2">
        {task.title}
      </h3>
      <span className=" h-6 w-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline/>
      </span>
    </article>
  );
};
