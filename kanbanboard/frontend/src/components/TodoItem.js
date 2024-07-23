import React from 'react';

function TodoItem({ id, text, done, onClickDelete, onClickComplete }) {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={done === "Y"} 
        onChange={() => onClickComplete(id)} 
      />
        {text}
      <a className="Task_Remove" onClick={() => onClickDelete(id)}></a>
    </div>
  );
}

export default TodoItem;
