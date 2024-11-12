// Reactを使うための部品とアイコンを取り込む
import React, { useState } from "react";
import { Task } from "../task"; // タスクを表示するための部品
import { FormModal } from "../modal"; // モーダル（ポップアップ画面）を表示するための部品
import { TaskType } from "../../interfaces/TaskType"; // タスクのデータの形を決める型
import MenuIcon from "@material-ui/icons/Menu"; // メニューアイコン
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"; // 追加アイコン
import "./style.css"; // このコンポーネント用のスタイル

// 必要な情報（タスクとタイトル）をまとめておく
interface Props {
  tasks: TaskType[]; // 複数のタスク
  title: string; // リストのタイトル（例：ToDo）
}

// ToDoListという名前のコンポーネントを作成
export const ToDoList = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false); // モーダル（ポップアップ）が開いているかどうか
  const [isListOpen, setIsListOpen] = useState(true); // リストが開いているかどうか
  const [selectTask, setSelectTask] = useState<TaskType | undefined>(); // 選ばれたタスク

  // モーダルを開く関数
  const handleOpen = () => {
    setIsOpen(true);
  };

  // モーダルを閉じる関数
  const handleClose = () => {
    setSelectTask(undefined); // 選ばれたタスクをリセット
    setIsOpen(false); // モーダルを閉じる
  };

  // リストの表示・非表示を切り替える関数
  const handleOnClick = () => {
    setIsListOpen(!isListOpen);
  };

  // IDが合うタスクを見つけて選ぶ関数
  const getMatchTask = (id: number) => {
    setSelectTask(
      props.tasks.find((task: TaskType) => {
        return id === task.id;
      })
    );
    handleOpen(); // モーダルを開く
  };

  return (
    // タスクリスト全体の表示
    <div className="task_list">
      {/* セクションの見た目 */}
      <div className="section">
        <MenuIcon className="section_ele" onClick={handleOnClick} />{" "}
        {/* メニューアイコン */}
        <span className="section_ele">{props.title}</span>{" "}
        {/* リストのタイトル */}
        {/* タイトルが "ToDo" のときにだけ表示される追加アイコン */}
        {props.title === "ToDo" && (
          <AddCircleOutlineIcon
            className="add_circle_outline_icon"
            fontSize="small"
            onClick={handleOpen}
          />
        )}
        {/* モーダルの中身を表示 */}
        <FormModal
          handleClose={handleClose} // 閉じる関数
          isOpen={isOpen} // モーダルの開閉状態
          body="taskBody" // モーダルの中の表示を決める
          task={selectTask} // 選ばれたタスク
        />
      </div>
      {/* タスクリストの本体 */}
      <div className="task_field">
        {/* リストが開いているときだけタスクを表示 */}
        {isListOpen &&
          props.tasks.map((task: TaskType) => {
            return (
              <Task task={task} key={task.id} getMatchTask={getMatchTask} />
            );
          })}
      </div>
    </div>
  );
};

// ToDoList という名前のコンポーネントは、やることリスト（ToDoリスト）を表示するためのものです。
// リストには、いくつかのタスクが含まれており、それぞれのタスクには名前や説明などの情報があります。
// isOpen という変数で、ポップアップ（モーダル）が開いているかどうかを管理しています。
// メニューアイコンをクリックするとリストが開いたり閉じたりします。
// タイトルが「ToDo」のときだけ、追加アイコンが表示され、クリックすると新しいタスクを追加するためのポップアップが開きます。
// ポップアップを閉じたり、特定のタスクをクリックして選択することもできます。
