import { JiraTasks } from '../../components';
import {useTaskStore} from "../../stores";

export const JiraPage = () => {
  const openTasks = useTaskStore( state => state.getTasksByStatus('open'));
  const doneTasks = useTaskStore( state => state.getTasksByStatus('done'));
  const inProgressTasks = useTaskStore( state => state.getTasksByStatus('progress'));
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objetos de Zustand</p>
      <hr />

      <aside className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks title='Pendientes' value='open' tasks={ openTasks } />
          
          <JiraTasks title='Avanzando' value='progress' tasks={ inProgressTasks } />
          
          <JiraTasks title='Terminadas' value='done' tasks={ doneTasks } />

      </aside>

      



    </>
  );
};
