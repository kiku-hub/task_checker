// Reactの中にある「useReducer」を使えるようにする
import { useReducer } from "react";
import { TaskType } from "../interfaces/TaskType"; // タスクのデータの形を決める型
import { GenreType } from "../interfaces/GenreType"; // ジャンルのデータの形を決める型

// 「やること（タスク）」や「ジャンル」を更新するときの種類と内容を決める箱
export type dataAction = {
  type: "tasksUpdate" | "genresUpdate"; // 「タスクを更新する」か「ジャンルを更新する」
  payload: { task?: TaskType[]; genre?: GenreType[] }; // 更新するときに使うデータ
};

// 「やることリスト」と「ジャンルリスト」の形を定義
export type Data = {
  tasksData: TaskType[]; // やること（タスク）のリスト
  genresData: GenreType[]; // ジャンルのリスト
};

// useDataReducerという関数を作る
// データと更新するための関数を返す
export const useDataReducer = (): [
  Data,
  ({ type, payload }: dataAction) => void
] => {
  // 最初に持っているデータ（空っぽのやることとジャンル）
  const initialData: Data = {
    tasksData: [
      {
        id: 0, // タスクのID
        name: "", // タスクの名前
        explanation: "", // タスクの説明
        deadlineDate: "", // タスクの締切日
        status: 0, // タスクの状態
        genreId: 0, // タスクのジャンルID
      },
    ],
    genresData: [{ id: 0, name: "" }], // ジャンルのIDと名前
  };

  // データをどう変えるかを決める関数
  const reducer = (state: Data, action: dataAction) => {
    switch (action.type) {
      // タスクを更新するとき
      case "tasksUpdate":
        return {
          ...state, // 今のデータをそのままコピー
          tasksData: action.payload.task || state.tasksData, // 新しいタスクデータがあればそれに変える
        };
      // ジャンルを更新するとき
      case "genresUpdate":
        return {
          ...state, // 今のデータをそのままコピー
          genresData: action.payload.genre || state.genresData, // 新しいジャンルデータがあればそれに変える
        };
    }
  };

  // useReducerを使って、データと更新する関数を用意
  const [data, dispatch] = useReducer(reducer, initialData);
  return [data, dispatch]; // データと更新する関数を返す
};
