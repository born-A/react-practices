import React, { useState, useEffect } from 'react';
import './styles.css';
import CreateTodo from './components/CreateTodo';
import TodoItem from './components/TodoItem';
import axios from 'axios';

function KanbanBoard() {
  const [cardTasksFullList, setCardTasksList] = useState([]);
  const [inputTexts, setInputTexts] = useState({}); // 각 카드의 입력 텍스트를 저장하는 객체
  const [todoList, setTodoList] = useState([]);
  const [visibleCards, setVisibleCards] = useState({}); // 각 카드의 가시성 상태를 관리하는 객체

  useEffect(() => {
    axios.get('http://localhost:8080/api')
      .then((res) => {
        setCardTasksList(res.data.data.cardTasksResponseDTO);
      })
      .catch(error => console.log(error));
  }, []);

  const textTypingHandler = (e, cardNo) => {
    setInputTexts({
      ...inputTexts,
      [cardNo]: e.target.value,
    });
  };

  const textInputHandler = (e, cardNo) => {
    e.preventDefault();
    const newTodo = {
      name: inputTexts[cardNo],
      done: "N",
      cardNo: cardNo
    };

    axios.post('http://localhost:8080/api', newTodo)
      .then(() => {
        setTodoList([...todoList, newTodo]);
        setInputTexts({
          ...inputTexts,
          [cardNo]: "",
        });
      })
      .catch((error) => {
        console.error("할 일을 생성하지 못했습니다:", error);
      });
  };

  const textDeleteHandler = (id) => {
    const params = { no: id };
    axios.delete('http://localhost:8080/api/delete', { params })
      .then(() => {
        setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
        console.log(`ID가 ${id}인 항목을 성공적으로 삭제했습니다.`);
      })
      .catch(error => {
        console.error(`ID가 ${id}인 항목을 삭제하지 못했습니다:`, error);
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
        console.error("할 일을 업데이트하지 못했습니다:", error);
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
          const isVisible = visibleCards[cardNo]; // 해당 카드의 가시성 상태

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
                      onChange={(e) => textTypingHandler(e, cardNo)}
                      onSubmit={(e) => textInputHandler(e, cardNo)}
                      inputText={inputTexts[cardNo] || ""}
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
