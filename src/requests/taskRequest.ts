// axiosというライブラリを使って、サーバーと通信するための「道具」を取り込む
import axiosBase from "axios";
// タスクのデータの形（名前やIDなど）を使えるようにする
import { TaskType } from "../interfaces/TaskType";

// 「やること」（アクション）の種類を定義
type action =
  | "fetchTasks"
  | "createTasks"
  | "updateTasks"
  | "deleteTasks"
  | "updateStatus";

// サーバーに送るデータの形（ここではタスクのデータと状態）を定義
type parameter = { data: TaskType; status?: number };

// サーバーのURLを設定して、通信の設定を作る
const api = axiosBase.create({
  baseURL: "http://localhost:3001/tasks", // サーバーの場所
  responseType: "json", // 返ってくるデータの形式
});

// タスクに関するリクエスト（お願い）を送る関数を作る
export const taskRequest: (
  action: action,
  parameter?: parameter
) => any = async (action: action, parameter?: parameter) => {
  // parameterがある場合（データが必要な場合）
  if (parameter) {
    switch (action) {
      // 「createTasks」というアクションが指定されたら新しいタスクを作る
      case "createTasks":
        const createTasks = await api.post("/", parameter.data); // サーバーに新しいタスクを送る
        return createTasks.data; // 作ったタスクのデータを返す
      // 「updateTasks」というアクションが指定されたらタスクを更新する
      case "updateTasks":
        const updateTasks = await api.put(
          `/${parameter.data.id}`,
          parameter.data
        ); // サーバーに更新するタスクを送る
        return updateTasks.data; // 更新したタスクのデータを返す
      // 「deleteTasks」というアクションが指定されたらタスクを削除する
      case "deleteTasks":
        const deleteTasks = await api.delete(`/${parameter.data.id}`); // サーバーからタスクを消す
        return deleteTasks.data; // 削除したタスクのデータを返す
      // 「updateStatus」というアクションが指定されたらタスクの状態を更新する
      case "updateStatus":
        const updateStatus = await api.post(`/${parameter.data.id}/status`, {
          status: parameter.status, // 新しい状態を送る
        });
        return updateStatus.data; // 更新した状態のデータを返す
      default:
        return null; // それ以外のアクションは何もしない
    }
  } else {
    // parameterがない場合（データが必要ない場合）
    switch (action) {
      // 「fetchTasks」というアクションが指定されたらタスクを全部もらってくる
      case "fetchTasks":
        const fetchTasks = await api.get("/"); // サーバーからタスクをもらう
        return fetchTasks.data; // もらったタスクのデータを返す
      default:
        return null; // それ以外のアクションは何もしない
    }
  }
};

// taskRequest関数は、サーバーに「タスクを見せて」「タスクを作って」「タスクを更新して」「タスクを消して」「タスクの状態を変えて」とお願いするための関数です。
// action は、何をしたいかを指定するための「やることリスト」です。「fetchTasks」（タスクを取得）、「createTasks」（タスクを作成）、「updateTasks」（タスクを更新）、「deleteTasks」（タスクを削除）、「updateStatus」（タスクの状態を更新）の5つのやることがあります。
// サーバーからタスクのデータをもらったり、新しいタスクを作ったり、タスクの状態を変えたりしてタスクを管理します。