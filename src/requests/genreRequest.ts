// axiosというライブラリを使って、サーバーと通信するための「道具」を取り込む
import axiosBase from "axios";
// ジャンルのデータの形（名前やID）を使えるようにする
import { GenreType } from "../interfaces/GenreType";

// 「やること」（アクション）の種類を定義
type action = "fetchGenres" | "createGenres" | "deleteGenres";

// サーバーに送るデータの形（ここではジャンルのデータ）を定義
type parameter = { data: GenreType };

// サーバーのURLを設定して、通信の設定を作る
const api = axiosBase.create({
  baseURL: "http://localhost:3001/genres", // サーバーの場所
  responseType: "json", // 返ってくるデータの形式
});

// ジャンルに関するリクエスト（お願い）を送る関数を作る
export const genreRequest: (
  action: action,
  parameter?: parameter
) => any = async (action: action, parameter?: parameter) => {
  // parameterがある場合（データが必要な場合）
  if (parameter) {
    switch (action) {
      // 「createGenres」というアクションが指定されたら新しいジャンルを作る
      case "createGenres":
        const createGenres = await api.post("/", parameter.data); // サーバーに新しいジャンルを送る
        return createGenres.data; // 作ったジャンルのデータを返す
      // 「deleteGenres」というアクションが指定されたらジャンルを削除する
      case "deleteGenres":
        const deleteGenres = await api.delete(`/${parameter.data.id}`); // サーバーからジャンルを消す
        return deleteGenres.data; // 削除したジャンルのデータを返す
      default:
        return null; // それ以外のアクションは何もしない
    }
  } else {
    // parameterがない場合（データが必要ない場合）
    switch (action) {
      // 「fetchGenres」というアクションが指定されたらジャンルを全部もらってくる
      case "fetchGenres":
        const fetchGenres = await api.get("/"); // サーバーからジャンルをもらう
        return fetchGenres.data; // もらったジャンルのデータを返す
      default:
        return null; // それ以外のアクションは何もしない
    }
  }
};
// genreRequest関数 は、サーバーに「ジャンルを見せて」「ジャンルを作って」「ジャンルを消して」とお願いするための関数です。
// action は、何をしたいかを指定するための「やることリスト」です。「fetchGenres」（ジャンルを取得）、「createGenres」（ジャンルを作成）、「deleteGenres」（ジャンルを削除）の3つのやることがあります。
// サーバーからデータをもらったり、データを送ってジャンルを作ったり消したりします。
