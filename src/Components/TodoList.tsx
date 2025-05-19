import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, Categories } from "../atoms";
import AddTodo from "./AddTodo";
import ToDo from "./ToDo";

function TodoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectedCategory = Categories.find(
      (c) => c.id === e.currentTarget.value
    );
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select onInput={onInput} value={category.id}>
        {Categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <AddTodo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default TodoList;
