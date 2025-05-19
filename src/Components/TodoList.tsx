import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelctor, toDoState } from "../atoms";
import AddTodo from "./AddTodo";
import ToDo from "./ToDo";

function TodoList() {
  const toDos = useRecoilValue(toDoSelctor);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select onInput={onInput} value={category}>
        <option value="To Do">To Do</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      <AddTodo />
    </div>
  );
}

export default TodoList;
