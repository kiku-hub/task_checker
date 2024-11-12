// Reactと使うための部品を取り込む
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header"; // 画面の上に表示するヘッダー
import { Select } from "../../components/select"; // 選択できるリスト
import { ToDoList } from "../../components/toDoList"; // やることリストを表示する部品
import { FormModal } from "../../components/modal"; // モーダル（ポップアップ画面）
import { TaskType } from "../../interfaces/TaskType"; // タスクのデータの形
import { taskRequest } from "../../requests/taskRequest"; // タスクのデータをサーバーから取得
import { genreRequest } from "../../requests/genreRequest"; // ジャンルのデータをサーバーから取得
import { Data, dataAction, useDataReducer } from "../../hooks/useDataReducer"; // タスクやジャンルをまとめて管理する機能
import { useFilterTasks } from "../../hooks/useFilterTasks"; // 特定のジャンルのタスクだけを表示する機能
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"; // アイコンを表示するため
import "./style.css"; // スタイル（見た目）

// データを使えるようにするための特別な場所を作る
type dataContextType = {
  data: Data;
  dispatch: ({ type, payload }: dataAction) => void;
};

// データを使えるようにするための場所を作成
export const DataContext = React.createContext<dataContextType>(
  {} as dataContextType
);

// Homeという画面を作る
export const Home = () => {
  const [isOpen, setIsOpen] = useState(false); // モーダル（ポップアップ）が開いているかどうか
  const [data, dispatch] = useDataReducer(); // データとそれを変えるための方法
  const [selectGenreId, setSelectGenreId] = useState<number>(0); // 選ばれたジャンルのID
  const [filteredTasks, tasksDispatch] = useFilterTasks(); // フィルターされたタスクとその設定
  const taskStatusElements: string[] = [
    "ToDo", // やること
    "Pending", // 保留中
    "Doing(ToDay)", // 今日やること
    "WIP", // 作業中
    "Check", // 確認中
    "Done", // 完了
  ];

  // モーダルを開く
  const handleOpen = () => {
    setIsOpen(true);
  };
  // モーダルを閉じる
  const handleClose = () => {
    setIsOpen(false);
  };

  // 選択したジャンルを変える
  const changeSelectGenreId = (event: any) => {
    const id = event.target.value;
    setSelectGenreId(id);
  };

  // 画面を開いたときにタスクとジャンルのデータをサーバーから取ってくる
  useEffect(() => {
    const fetchData = async () => {
      const genres = await genreRequest("fetchGenres"); // ジャンルのデータを取ってくる
      const tasks = await taskRequest("fetchTasks"); // タスクのデータを取ってくる
      dispatch({ type: "genresUpdate", payload: { genre: genres } }); // ジャンルを更新
      dispatch({ type: "tasksUpdate", payload: { task: tasks } }); // タスクを更新
    };
    fetchData();
  }, []);

  // データが変わるたびにコンソールに表示
  useEffect(() => {
    console.log(data);
  }, [data]);

  // タスクのフィルターをする（選んだジャンルだけを表示）
  useEffect(() => {
    tasksDispatch({
      type: "filterTask",
      payload: { tasks: data.tasksData, genreId: selectGenreId },
    });
  }, [data.tasksData, selectGenreId]);

  return (
    // ここから画面の見た目を作る
    <DataContext.Provider value={{ data, dispatch }}>
      <div className="main">
        <Header /> {/* ヘッダーを表示 */}
        <div className="genre">
          <Select genres={data.genresData} changeSelect={changeSelectGenreId} />{" "}
          {/* ジャンルの選択リスト */}
          <AddCircleOutlineIcon
            className="add_circle_outline_icon"
            fontSize="medium"
            onClick={handleOpen} // 追加アイコンをクリックでモーダルを開く
          />
          <FormModal
            handleClose={handleClose} // モーダルを閉じる関数
            isOpen={isOpen} // モーダルが開いているかどうか
            body="genreBody" // モーダルに表示する内容
          />
        </div>
        <div className="contents">
          {taskStatusElements.map((element) => {
            const tasks = filteredTasks.filter((filteredTask: TaskType) => {
              return (
                filteredTask.status === taskStatusElements.indexOf(element)
              );
            });
            return <ToDoList title={element} tasks={tasks} key={element} />; // やることリストを表示
          })}
        </div>
      </div>
    </DataContext.Provider>
  );
};
// Homeという画面を作っています。この画面にはやることリストが並び、ジャンルや状態（やること・完了など）に応じてタスクを表示できます。
// HeaderやSelect、ToDoList、FormModalなどの部品を使って画面を組み立てます。
// モーダルは、ポップアップ画面のことで、クリックすると新しいジャンルやタスクを追加できるようにしています。
