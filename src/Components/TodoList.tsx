import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import AddTodo from "./AddTodo";
import ToDo from "./ToDo";

function TodoList() {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <AddTodo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
