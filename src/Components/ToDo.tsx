import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ id, category, text }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (name: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as IToDo["category"] };
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
      {category !== Categories.DOING && (
        <button
          name={Categories.DOING}
          onClick={() => onClick(Categories.DOING)}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button
          name={Categories.TO_DO}
          onClick={() => onClick(Categories.TO_DO)}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={() => onClick(Categories.DONE)}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
