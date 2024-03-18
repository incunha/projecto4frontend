import React, { useEffect, useState } from 'react';
import './column.css';
import UserCard from '../userCard/userCard';
import TaskCard from '../taskCard/taskCard';
import { useUserStore } from '../../../userStore'; 
import  useTasksStore  from '../../../taskStore'; 

  
function Column({ title, items, CardComponent, onCardClick }) {
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="column-content">
        {items.map(item => {
          const props = {
            key: item.id || item.username,
            onCardClick: () => onCardClick(item),
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