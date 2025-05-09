import React, { useState } from "react";

function TodoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="Write a todo" value={toDo} onChange={onChange} />
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
