import React from 'react';
import Column from './column/column.jsx';

function Tasks() {
  return (
    <div className="columns">
      <Column title="To Do" />
      <Column title="Doing" />
      <Column title="Done" />
    </div>
  );
}

export default Tasks;