import React, {useEffect} from 'react';
import Column from './column/column.jsx';
import useTasksStore from '../../taskStore.js';
import TaskCard from './taskCard/taskCard.jsx';

function Tasks() {
  const taskColumns = ['To Do', 'Doing', 'Done'];
  const { tasks, fetchTasks } = useTasksStore();

  const statusValues = {
    'To Do': 10,
    'Doing': 20,
    'Done': 30,
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  return (
    <div className="columns">
      {taskColumns.map(title => (
        <Column
          key={title}
          title={title}
          items={tasks.filter(task => task.status === statusValues[title] && task.active)}
          CardComponent={TaskCard}
        />
      ))}
    </div>
  );
}

export default Tasks;