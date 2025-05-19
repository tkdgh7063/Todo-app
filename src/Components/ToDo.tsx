import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Categories,
  categoryListState,
  ICategory,
  IToDo,
  toDoState,
} from "../atoms";

function ToDo({ id, category, text }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryListState);
  const onClick = (c: ICategory) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: c };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories.map((c) =>
        c.id !== category.id ? (
          <button key={c.id} name={c.name} onClick={() => onClick(c)}>
            {c.name}
          </button>
        ) : null
      )}
    </li>
  );
}

export default ToDo;
