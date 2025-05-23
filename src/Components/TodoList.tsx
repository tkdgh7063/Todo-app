import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, categoryListState } from "../atoms";
import AddTodo from "./AddTodo";
import ToDo from "./ToDo";
import CreatableSelect from "react-select/creatable";
import { StylesConfig } from "react-select";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface Option {
  label: string;
  value: string;
}

const darkThemeStyles: StylesConfig<Option, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1e1e1e",
    borderColor: state.isFocused ? "#3b82f6" : "#444",
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
    color: "#f9f9f9",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#2c2c2c",
    color: "#f9f9f9",
    zIndex: 100,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "#3b3b3b"
      : state.isSelected
      ? "#3b82f6"
      : "#2c2c2c",
    color: state.isSelected ? "#ffffff" : "#f9f9f9",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#f9f9f9",
  }),
  input: (base) => ({
    ...base,
    color: "#f9f9f9",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#aaa",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#3b3b3b",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#f9f9f9",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#aaa",
    ":hover": {
      backgroundColor: "#f87171",
      color: "#fff",
    },
  }),
};

function TodoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoryListState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreatableSelect
        styles={darkThemeStyles}
        isClearable
        options={categories.map((c) => ({ label: c.name, value: c.id }))}
        placeholder="Select or Type a Category..."
        value={category ? { label: category.name, value: category.id } : null}
        onCreateOption={(inputValue) => {
          const newCategory = {
            id: (categories.length + 1).toString(),
            name: inputValue,
          };
          setCategories((prev) => [...prev, newCategory]);
          setCategory(newCategory);
        }}
        onChange={(option) => {
          if (option !== null) {
            setCategory({ id: option.value, name: option.label });
          } else {
            setCategory(undefined);
          }
        }}
      />
      <hr />
      <AddTodo />
      <Droppable droppableId="todo-list">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <Draggable
                draggableId={toDo.id.toString()}
                index={index}
                key={toDo.id}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <ToDo key={toDo.id} {...toDo} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

export default TodoList;
