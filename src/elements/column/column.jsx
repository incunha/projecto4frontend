import React, { useEffect, useState } from 'react';
import './column.css';
import UserCard from '../userCard/userCard';
import TaskCard from '../taskCard/taskCard';
import { useUserStore } from '../../../userStore'; 
import  useTasksStore  from '../../../taskStore'; 

function Column({ title, items, CardComponent, onCardClick }) {
  const {updateStatus, fetchActiveTasks} = useTasksStore();

  const statusMapping = {
    "To Do": 10,
    "Doing": 20,
    "Done": 30
  };

  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="column-content" 
           onDragOver={(event)=> event.preventDefault()} 
           onDrop={async (event)=>{
             const taskId= event.dataTransfer.getData('text/plain');
             const status = statusMapping[title];
             await updateStatus(taskId, status);
             fetchActiveTasks();
           }}
      >
      {items.map(item => {
  const props = {
    key: item.id || item.username,
    onCardClick: () => onCardClick(item),
    draggable: !item.deleted, 
    active: item.active, 
  };

  if (CardComponent === UserCard) {
    props.user = item;
  } else if (CardComponent === TaskCard) {
    props.task = item;
  }

  return <CardComponent {...props} />;
})}
      </div>
    </div>
  );
}

export default Column;