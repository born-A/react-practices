import React, { useState, useEffect } from 'react';
import './styles.css';
import CreateTodo from './components/CreateTodo';
import TodoItem from './components/TodoItem';
import axios from 'axios';

function KanbanBoard() {
  const [cardTasksFullList, setCardTasksList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [visibleCards, setVisibleCards] = useState({}); // 카드의 visibility 상태를 관리하는 객체

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
    setVisibleCards(prevVisibleCards => ({
      ...prevVisibleCards,
      [cardNo]: !prevVisibleCards[cardNo]
    }));
  };

  return (
    <div className="Kanban_Board">
      <div className="Card_List">
        <h1>To Do</h1>
        {cardTasksFullList && cardTasksFullList.map((cardTasks) => {
          const cardNo = cardTasks.cardInfo.no;
          const isVisible = visibleCards[cardNo]; // 해당 카드의 visibility 상태

          const cardTitleClass = isVisible
            ? "Card_Title Card_Title_Open"
            : "Card_Title";

          return (
            <div className="_Card" key={cardNo}>
              <div
                className={cardTitleClass}
                onClick={() => handleCardClick(cardNo)}
              >
                {cardTasks.cardInfo.title}
              </div>
              {isVisible && (
                <div className="Card_Details">
                  {cardTasks.cardInfo.description}
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
                      onSubmit={(e) => textInputHandler(e, cardNo)}
                      inputText={inputText}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="Card_List">
        <h1>Doing</h1>
        <div className="_Card">
          <div className="Card_Title">최종 프로젝트 성공</div>
          <div className="Card_Details">
            API 명세서 작성하기
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
