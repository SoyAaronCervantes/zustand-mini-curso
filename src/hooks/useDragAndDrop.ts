import {type DragEvent, useState} from "react";
import {useTaskStore} from "../stores";
import type {TaskStatus} from "../types";

export const useDragAndDrop = () => {
  const isDragging = useTaskStore( state => !!state.draggingTaskId );
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
  const handleDrop = (event: DragEvent<HTMLElement>, status: TaskStatus) => {
    event.preventDefault();
    setOnDragOver(false);
    onTaskDrop( status );
  }

  return {
    isDragging,
    onDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
