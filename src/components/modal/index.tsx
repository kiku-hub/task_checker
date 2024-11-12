// Reactとモーダルを使うための部品を取り込む
import React from "react";
import Modal from "react-modal";

// ジャンルとタスクを編集するための部品を取り込む
import { GenreBody } from "./genreBody";
import { TaskBody } from "./taskBody";

// タスクのデータがどんな形かを取り込む
import { TaskType } from "../../interfaces/TaskType";

// モーダルに必要な情報（小さな箱）を用意しておく
interface Props {
  handleClose: () => void; // モーダルを閉じるためのボタン
  isOpen: boolean; // モーダルが開いているか閉じているかを決める
  body: string; // 中に何を表示するかを決めるための名前
  task?: TaskType; // タスク（お仕事）のデータ（タスク編集モーダルのとき使う）
}

// モーダルの見た目のスタイルを決める
const customStyles = {
  overlay: {
    backgroundColor: "rgb(80, 80, 80, 0.8)", // モーダルの外側の暗さ
  },
  content: {
    top: "10%", // モーダルの位置（上からの距離）
    left: "60%", // モーダルの位置（左からの距離）
    right: "50%", // モーダルの位置（右からの距離）
    height: "75vh", // モーダルの高さ
    width: "20vw", // モーダルの幅
    marginLeft: "-30vw", // 左からどれくらいの距離に置くか
    padding: "2vw 10vw", // 中の余白
  },
};

// モーダルの中に何を表示するかを決める関数
const renderBody = (body: string, handleClose: () => void, task?: TaskType) => {
  // bodyの名前が "taskBody" のとき
  switch (body) {
    case "taskBody":
      return <TaskBody handleClose={handleClose} task={task} />; // タスク編集の画面を出す
    // bodyの名前が "genreBody" のとき
    case "genreBody":
      return <GenreBody />; // ジャンル編集の画面を出す
    // それ以外のとき
    default:
      return <div />; // 何もない空の箱を出す
  }
};

// FormModalという名前のモーダル（ポップアップ）を作る
export const FormModal = (props: Props) => {
  // モーダルを使うために必要な設定
  Modal.setAppElement("#root");

  return (
    // モーダルの中身を作る
    <div>
      <Modal
        isOpen={props.isOpen} // モーダルが開いているかどうか
        onRequestClose={props.handleClose} // モーダルを閉じるときの操作
        style={customStyles} // 上で決めたスタイルを適用
      >
        {renderBody(props.body, props.handleClose, props.task)}
        {/* 中に何を表示するか */}
      </Modal>
    </div>
  );
};
