import { useReducer } from "react";
import { TaskType } from "../interfaces/TaskType";
import { GenreType } from "../interfaces/GenreType";

export type dataAction = {
  type: "tasksUpdate" | "genresUpdate";
  payload: { task?: TaskType[]; genre?: GenreType[] };
};

export type Data = {
  tasksData: TaskType[];
  genresData: GenreType[];
};

export const useDataReducer = (): [Data, ({ type, payload }: dataAction) => void] => {
  const initialData: Data = {
    tasksData: [
      {
        id: 0,
        name: "",
        explanation: "",
        deadlineDate: "",
        status: 0,
        genreId: 0,
      },
    ],
    genresData: [{ id: 0, name: "" }],
  };

  const reducer = (state: Data, action: dataAction) => {
    switch (action.type) {
      case "tasksUpdate":
        return {
          ...state,
          tasksData: action.payload.task || state.tasksData,
        };
      case "genresUpdate":
        return {
          ...state,
          genresData: action.payload.genre || state.genresData,
        };
    }
  };

  const [data, dispatch] = useReducer(reducer, initialData);
  return [data, dispatch];
};
