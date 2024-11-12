// Reactの中にある「useReducer」を使えるようにする
import { useReducer } from "react";
import { TaskType } from "../interfaces/TaskType"; // タスクの形を決める型

// フィルターするための指示（例えば「ジャンルでフィルターする」）
export type filterAction = {
  type: "filterTask"; // 「タスクをフィルターする」というタイプ
  payload: {
    tasks: TaskType[]; // タスクのリスト
    genreId: number; // ジャンルのID
  };
};

// useFilterTasksという関数を作る
// フィルターしたタスクのリストと、フィルターをかけるための関数を返す
export const useFilterTasks = (): any => {
  // 最初に持っているデータ（空っぽのタスク）
  const initialData: TaskType[] = [
    {
      id: 0, // タスクのID
      name: "", // タスクの名前
      explanation: "", // タスクの説明
      deadlineDate: "", // タスクの締切日
      status: 0, // タスクの状態
      genreId: 0, // タスクのジャンルID
    },
  ];

  // データをどう変えるかを決める関数
  const reducer = (tasks: TaskType[], action: filterAction) => {
    switch (action.type) {
      // タスクをジャンルでフィルターするとき
      case "filterTask":
        const id: number = Number(action.payload.genreId); // ジャンルのIDを数値にする
        if (id === 0) {
          // IDが0なら全タスクを返す（フィルターしない）
          return action.payload.tasks;
        } else {
          // IDが0でないなら、そのジャンルIDに合うタスクだけを返す
          return action.payload.tasks.filter((task: TaskType) => {
            return id === task.genreId;
          });
        }
    }
  };

  // useReducerを使って、フィルターしたタスクとフィルター関数を用意
  const [filteredTasks, tasksDispatch] = useReducer(reducer, initialData);
  return [filteredTasks, tasksDispatch]; // フィルター済みのタスクとフィルターするための関数を返す
};

// useFilterTasks という特別な関数は、たくさんあるタスクの中から、特定のジャンルに合うタスクだけを取り出すためのものです。
// 最初は空っぽのタスクが用意されていて、ジャンルでフィルターしたいときにreducerという仕組みが使われます。
// filterTask という指示を出すと、ジャンルIDが指定されている場合にそのジャンルだけのタスクを取り出し、IDが「0」の場合はすべてのタスクを表示します。
// useReducerは、このデータのフィルターを助けてくれる機能で、最初のデータと、フィルターを変更するための方法を提供します。
