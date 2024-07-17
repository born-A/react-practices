import React from 'react';

function TodoItem({ id, text, completed,  onClickDelete, onClickComplete}) {

  return (
    <div>
      <input 
      type="checkbox" 
      checked={completed} 
      onChange={() => onClickComplete(id)} 
      />

      <span style={completed ? { textDecoration: "line-through" } : undefined}>{text}</span>
      <a className="Task_Remove" onClick={() => onClickDelete(id)}></a>
    </div>
  );
}

export default TodoItem;