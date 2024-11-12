// Reactと関連するフック、コンポーネントをインポート
import React, { useContext, useState } from "react";
import { Select } from "../../components/select";
import { TaskType } from "../../interfaces/TaskType";
import { taskRequest } from "../../requests/taskRequest";
import { DataContext } from "../../pages/home";
import "./style.css";

// Propsインターフェースを定義
interface Props {
  task?: TaskType; // 編集するタスクのデータ（新規作成の場合は空）
  handleClose: () => void; // モーダルを閉じる関数
  initialValue?: number; // 初期値（ジャンルID）として使用
}

// TaskBodyコンポーネントを定義
export const TaskBody = (props: Props) => {
  const { data, dispatch } = useContext(DataContext); // グローバル状態管理
  const [title, setTitle] = useState<string>(
    (props.task && props.task.name) || "" // タスク名の初期値
  );
  const [genreId, setGenreId] = useState<number>(
    (props.task && props.task.genreId) || 1 // ジャンルIDの初期値
  );
  const [explanation, setExplanation] = useState<string>(
    (props.task && props.task.explanation) || "" // 説明の初期値
  );
  const [deadlineDate, setDeadlineDate] = useState<string>(
    (props.task && props.task.deadlineDate) || "" // 期限日の初期値
  );

  // ジャンル選択変更時のハンドラ
  const handleChangeGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenreId(Number(event.target.value));
  };

  // タイトル変更時のハンドラ
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // 説明変更時のハンドラ
  const handleChangeExplanation = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExplanation(event.target.value);
  };

  // 期限日変更時のハンドラ
  const handleChangeDeadlineDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeadlineDate(event.target.value);
  };

  // タスクの追加・更新処理
  const onClickSubmit = async () => {
    const requestData = {
      id: (props.task && props.task.id) || 0, // IDが存在しない場合は新規作成
      name: title,
      genreId: genreId,
      explanation: explanation,
      deadlineDate: deadlineDate,
      status: (props.task && props.task.status) || 0, // 新規の場合はデフォルトステータス
    };
    if (props.task !== undefined) {
      // 既存タスクの更新
      try {
        const tasks: TaskType[] = await taskRequest("updateTasks", {
          data: requestData,
        });
        dispatch({ type: "tasksUpdate", payload: { task: tasks } }); // 状態更新
      } catch (err: any) {
        console.log(err.message); // エラーメッセージの出力
      }
    } else {
      // 新規タスクの追加
      try {
        const tasks: TaskType[] = await taskRequest("createTasks", {
          data: requestData,
        });
        dispatch({ type: "tasksUpdate", payload: { task: tasks } });
      } catch (err: any) {
        console.log(err.message); // エラーメッセージの出力
      }
    }
    props.handleClose(); // モーダルを閉じる
  };

  // タスクの削除処理
  const handleOnDelete = async () => {
    try {
      if (props.task) {
        const tasks: TaskType[] = await taskRequest("deleteTasks", {
          data: props.task,
        });
        dispatch({ type: "tasksUpdate", payload: { task: tasks } }); // 状態更新
      }
      props.handleClose(); // モーダルを閉じる
    } catch (err: any) {
      console.log(err.message); // エラーメッセージの出力
    }
  };

  return (
    // モーダルのフォームコンテナ
    <form className="modal_body">
      <h2 className="input_menu">タスクを追加</h2>
      <div>
        <h4 className="input_title">ジャンル</h4>
        <div className="task_genre">
          {/* ジャンル選択ドロップダウン */}
          <Select
            genres={data.genresData}
            changeSelect={handleChangeGenre}
            initialValue={genreId}
          />
        </div>
        <h4 className="input_title">タイトル</h4>
        {/* タスクのタイトル入力 */}
        <input type="text" value={title} onChange={handleChangeTitle} />
        <h4 className="input_title">説明</h4>
        {/* タスクの説明入力 */}
        <textarea value={explanation} onChange={handleChangeExplanation} />
        <h4 className="input_title">期限</h4>
        {/* タスクの期限入力 */}
        <input
          className="input_date"
          type="date"
          value={deadlineDate}
          onChange={handleChangeDeadlineDate}
        />
      </div>
      {/* タスクの送信ボタン */}
      <input
        className="input_submit"
        type="button"
        value="送信"
        onClick={onClickSubmit}
      />
      {/* 既存タスクの場合のみ削除ボタンを表示 */}
      {props.task && (
        <button
          className="button delete_button"
          type="button"
          onClick={handleOnDelete}
        >
          このタスクを削除する
        </button>
      )}
    </form>
  );
};