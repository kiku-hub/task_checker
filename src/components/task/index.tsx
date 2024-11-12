// Reactと他に使うものを取り込む
import React, { useContext, useState } from "react";
import { Select } from "../select"; // 選択できるリストを表示するための部品
import { TaskType } from "../../interfaces/TaskType"; // タスクの形を決める型
import { taskRequest } from "../../requests/taskRequest"; // タスクを送ったりもらったりするための関数
import { DataContext } from "../../pages/home"; // データを使うための設定
import "./style.css"; // このコンポーネント用のスタイル（見た目）を読み込む

// タスクのプロパティ（小さな箱）を用意しておく
interface Props {
  task: TaskType; // タスクのデータ
  getMatchTask: (id: number) => void; // タスクのIDに合うものを見つけるための関数
}

// Taskコンポーネントを作成
export const Task = (props: Props) => {
  const { dispatch } = useContext(DataContext); // データを送ったり更新したりするための設定
  const [status, setStatus] = useState<number>(props.task.status); // タスクのステータス（今どんな状態か）を管理する

  // タスクのステータス（状態）のリスト
  const listElements: string[] = [
    "ToDo", // やること
    "Pending", // 保留中
    "Doing(ToDay)", // 今日やっていること
    "WIP", // 作業中
    "Check", // 確認中
    "Done", // 完了（やり終わった）
  ];

  // ステータス（状態）を変えるときの関数
  const changeStatus = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(event.target.value); // 選ばれた数字を変数にする
    try {
      const tasks: TaskType[] = await taskRequest("updateStatus", {
        data: props.task, // タスクのデータ
        status: val, // 新しい状態
      });
      dispatch({ type: "tasksUpdate", payload: { task: tasks } }); // 状態を更新
      setStatus(val); // 状態を変える
    } catch (err: any) {
      console.log(err.message); // エラーがあれば表示
    }
  };

  return (
    // タスクの見た目を作る
    <div
      className="task"
      style={{
        backgroundColor:
          new Date(props.task.deadlineDate) > new Date()
            ? "white" // 締切がまだなら白
            : "rgb(250, 194, 194)", // 締切を過ぎたらピンク
      }}
    >
      <span className="task_date">{props.task.deadlineDate}</span>{" "}
      {/* タスクの締切日 */}
      <div
        className="task_text_contents"
        onClick={() => props.getMatchTask(props.task.id)} // タスクをクリックしたらIDを使ってデータを取得
      >
        <h3 className="task_title">{props.task.name}</h3>{" "}
        {/* タスクのタイトル */}
        <p className="task_sentence">{props.task.explanation}</p>{" "}
        {/* タスクの説明 */}
      </div>
      <div className="task_input_contents">
        {/* タスクの状態を選べるリスト */}
        <Select
          optionElements={listElements} // 選べるリストの中身
          changeSelect={changeStatus} // 選択が変わったらこの関数を使う
          initialValue={status} // 最初の選択状態
        />
      </div>
    </div>
  );
};

// このコードは、タスクというお仕事を表示するためのものです。
// タスクの状態（やること・保留中・完了など）を選んで変えられるようにしています。
// タスクには締切日があり、もし締切を過ぎていると背景がピンク色になり、まだなら白のままです。
// タスクをクリックすると、そのタスクのデータを取得します。
