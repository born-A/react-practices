import { useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./TodoItem";

export default function TodoList() {
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

  return (
    <div className="todoListContainer">
      {todoList.map((item) => (
        <TodoItem key={item.id} text={item.text} completed={item.completed} />
      ))}
      <CreateTodo />
    </div>
  );
}