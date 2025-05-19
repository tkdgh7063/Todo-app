import { atom, selector } from "recoil";

export const Categories: ICategory[] = [
  { id: "0", name: "To Do" },
  { id: "1", name: "Doing" },
  { id: "2", name: "Done" },
];

export interface ICategory {
  id: string;
  name: string;
}

export interface IToDo {
  id: number;
  text: string;
  category: ICategory;
}

// export const categoryListState = atom<>({})

export const categoryState = atom<ICategory>({
  key: "category",
  default: Categories[0],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category.id === category.id);
  },
});
