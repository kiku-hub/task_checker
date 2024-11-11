import { useReducer } from "react";
import { TaskType } from "../interfaces/TaskType";
import { GenreType } from "../interfaces/GenreType";

export type dataAction = {
  type: "tasksUpdate" | "genresUpdate";
};

export type Data = {
  tasksData: TaskType[];
  genresData: GenreType[];
};

export const useDataReducer = (): any => {
  const initialData = {
    tasksData: [],
    genresData: [],
  };

  const reducer = (state: Data, action: dataAction) => {
    return state;
  };

  const [data, dispatch] = useReducer(reducer, initialData);
  return [data, dispatch];
};
