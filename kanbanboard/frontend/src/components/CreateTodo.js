import React from 'react';

function CreateTodo({ onChange, onSubmit, inputText }) {
  const activeButton = () => {
    alert(`${inputText} 입력 완료`);
  }

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      activeButton();
    }
  }

  return (
    <div >
      <form onSubmit={onSubmit}>
        <input className="Input_Add_Task"
          type="text"
          placeholder="태스크 추가"
          value={inputText}
          onChange={onChange}
          onKeyDown={(e) => activeEnter(e)}
        />
      </form>
    </div>
  );
}

export default CreateTodo;
