import React from 'react';
import './styles.css';
import CreateTodo from './components/CreateTodo';
import TodoItem from './components/TodoItem';
import axios from 'axios';
import {useEffect, useState} from "react";

function KanbanBoard() {
  const [cardTasksFullList, setCardTasksList] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8080/api')
        .then((res) => {
          console.log(res.data); // 응답 데이터를 로그로 출력
          setCardTasksList(res.data.cardTasksResponseDTO);
        })
        .catch(error => console.log(error))
    })

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
        {cardTasksFullList && cardTasksFullList.map((cardTasks) => (
          <div className="_Card" key={cardTasks.cardInfo.no}>
            <div className="Card_Title  Card_Title_Open">{cardTasks.cardInfo.title}</div>
            <div className="Card_Details">
            {cardTasks.cardInfo.description}

          <div className="Task_List">
            <ul>
              {cardTasks.taskInfoList.map((taskInfo) => (
                <li class="_Task" key={taskInfo.no}>
                <TodoItem
                  id={taskInfo.no}
                  text={taskInfo.name}
                  completed={taskInfo.done}
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
        ))}
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