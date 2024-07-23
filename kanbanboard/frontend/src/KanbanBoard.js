import React, { useState, useEffect } from 'react';
import './styles.css';
import CreateTodo from './components/CreateTodo';
import TodoItem from './components/TodoItem';
import axios from 'axios';

function KanbanBoard() {
  const [visibleCard, setVisibleCard] = useState(null);
  const [cardTasksFullList, setCardTasksList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api')
      .then((res) => {
        setCardTasksList(res.data.data.cardTasksResponseDTO);
      })
      .catch(error => console.log(error));
  }, []);

  const textTypingHandler = (e) => {
    setInputText(e.target.value);
  };

  const textInputHandler = (e, no) => {
    e.preventDefault();
    const newTodo = {
      name: inputText,
      done: "N",
      cardNo: no
    };

    axios.post('http://localhost:8080/api', newTodo)
      .then(() => {
        setTodoList([...todoList, newTodo]);
        setInputText("");
      })
      .catch((error) => {
        console.error("Failed to create todo:", error);
      });
  };

  const textDeleteHandler = (id) => {
    const params = { no: id };
    axios.delete('http://localhost:8080/api/delete', { params })
      .then(() => {
        setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
        console.log(`Item with id ${id} deleted successfully.`);
      })
      .catch(error => {
        console.error(`Failed to delete item with id ${id}:`, error);
      });
  };

  const handleComplete = (no) => {
    const newDoneStatus = (cardTasksFullList.find(card =>
      card.taskInfoList.some(task => task.no === no)
    )?.taskInfoList.find(task => task.no === no)?.done === "Y") ? "N" : "Y";

    axios.put(`http://localhost:8080/api/update?no=${no}&done=${newDoneStatus}`)
      .then(() => {
        setTodoList(todoList.map(todo =>
          todo.no === no ? { ...todo, done: newDoneStatus } : todo
        ));
      })
      .catch((error) => {
        console.error("Failed to update todo:", error);
      });
  };

  const handleCardClick = (cardNo) => {
    setVisibleCard(visibleCard === cardNo ? null : cardNo);
  };

  return (
    <div className="Kanban_Board">
      <div className="Card_List">
        <h1>To Do</h1>
        {cardTasksFullList && cardTasksFullList.map((cardTasks) => {
          // 조건에 따른 클래스 이름 결정
          const cardTitleClass = visibleCard === cardTasks.cardInfo.no
            ? "Card_Title Card_Title_Open"
            : "Card_Title";

          return (
            <div className="_Card" key={cardTasks.cardInfo.no}>
              <div
                className={cardTitleClass}
                onClick={() => handleCardClick(cardTasks.cardInfo.no)}
              >
                {cardTasks.cardInfo.title}
              </div>
              <div className="Card_Details">
                {cardTasks.cardInfo.description}
                {visibleCard === cardTasks.cardInfo.no && (
                  <div className="Task_List">
                    <ul>
                      {cardTasks.taskInfoList.map((taskInfo) => (
                        <li className="_Task" key={taskInfo.no}>
                          <TodoItem
                            id={taskInfo.no}
                            text={taskInfo.name}
                            done={taskInfo.done}
                            onClickDelete={() => textDeleteHandler(taskInfo.no)}
                            onClickComplete={() => handleComplete(taskInfo.no)}
                          />
                        </li>
                      ))}
                    </ul>
                    <CreateTodo
                      onChange={textTypingHandler}
                      onSubmit={(e) => textInputHandler(e, cardTasks.cardInfo.no)}
                      inputText={inputText}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
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
          <div className="Card_Title Card_Title_Open">완료된 작업들</div>
          <div className="Card_Details">
            <div className="Task_List">
              <ul>
                {/* {doneItems.map((item) => (
                  <li className="_Task" key={item.id}>
                    <TodoItem
                      id={item.id}
                      text={item.name}
                      done={item.done}
                      onClickDelete={textDeleteHandler}
                      onClickComplete={handleComplete}
                    />
                  </li>
                ))} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
