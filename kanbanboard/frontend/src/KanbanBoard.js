import React from 'react';
import { useState } from "react";
import './styles.css';
import CreateTodo from './components/CreateTodo';
import TodoItem from './components/TodoItem';

function KanbanBoard() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      text: "할일 1",
      completed: false,
    },
    {
      id: 2,
      text: "할일 2",
      completed: false,
    },
  ]);
  
  const textTypingHandler = (e) => {
    setInputText(e.target.value);
  };

  const textInputHandler = (event) => {
    event.preventDefault();
    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setInputText("");
  };

  const textDeleteHandler = (id) => {
    setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
  };

  const handleComplete = (id) => {
    setTodoList(todoList.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const todoItems = todoList.filter(item => !item.completed);
  const doneItems = todoList.filter(item => item.completed);

  return (
    <div className="Kanban_Board">
      <div className="Card_List">
        <h1>To Do</h1>
        <div className="_Card">
          <div className="Card_Title  Card_Title_Open">Stroy Board 작성</div>
          <div className="Card_Details">
            기능 기반의 화면 목업 작업

          <div className="Task_List">
            <ul>
              {todoItems.map((item) => (
                <li class="_Task" key={item.id}>
                <TodoItem
                  id={item.id}
                  text={item.text}
                  completed={item.completed}
                  onClickDelete={textDeleteHandler}
                  onClickComplete={handleComplete}
                />
                </li>
                ))
              }
            </ul>
            
            <CreateTodo
              onChange={textTypingHandler}
              onSubmit={textInputHandler}
              inputText={inputText}
            />

          </div>
        </div>
        </div>
      </div>
      
      <div className="Card_List">
        <h1>Doing</h1>

        <div className="_Card">
          <div className="Card_Title">React Study</div>
          <div className="Card_Details">
            React.JS 공부 하기
          </div>
        </div>

      </div>
      <div className="Card_List">
        <h1>Done</h1>
        <div className="_Card">
          <div className="Card_Title  Card_Title_Open">완료된 작업들</div>
          <div className="Card_Details">

            <div className="Task_List">
              <ul>
                {doneItems.map((item) => (
                  <li className="_Task" key={item.id}>
                    <TodoItem
                      id={item.id}
                      text={item.text}
                      completed={item.completed}
                      onClickDelete={textDeleteHandler}
                      onClickComplete={handleComplete}
                    />
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default KanbanBoard;