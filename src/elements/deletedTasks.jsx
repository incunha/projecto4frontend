import React, { useEffect } from 'react';
import Column from '../elements/column/column';
import useTasksStore from '../../taskStore';
import TaskCard from '../elements/taskCard/taskCard';

function DeletedTasks() {
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
          items={tasks.filter(task => task.status === statusValues[title] && !task.active)}
          CardComponent={TaskCard}
        />
      ))}
    </div>
  );
}

export default DeletedTasks;