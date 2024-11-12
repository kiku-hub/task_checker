// React, useContext, useStateフックのインポート
import React, { useContext, useState } from "react";

// ジャンルの型をインポート
import { GenreType } from "../../interfaces/GenreType";

// ジャンル関連のAPIリクエスト関数をインポート
import { genreRequest } from "../../requests/genreRequest";

// データコンテキストをインポート
import { DataContext } from "../../pages/home";

// Material-UIのCancelアイコンをインポート
import CancelIcon from "@material-ui/icons/Cancel";

// スタイルシートのインポート
import "./style.css";

// GenreBodyコンポーネントを定義
export const GenreBody = () => {
  // DataContextからdataとdispatch関数を取得
  const { data, dispatch } = useContext(DataContext);

  // ジャンル名の状態管理用変数を宣言
  const [genreName, setGenreName] = useState<string>("");

  // ジャンル名が変更された時に実行される関数
  const changeGenreName = (val: any) => {
    setGenreName(val.target.value);
  };

  // 新しいジャンルを追加する関数
  const onClickSubmit = async () => {
    const newData: GenreType = {
      id: 0, // 仮のID、実際にはサーバーで設定される
      name: genreName,
    };
    try {
      // genreRequestを使って新しいジャンルを作成
      const genres: GenreType[] = await genreRequest("createGenres", {
        data: newData,
      });
      // 取得したジャンルデータで状態を更新
      dispatch({ type: "genresUpdate", payload: { genre: genres } });
      // 入力フィールドをクリア
      setGenreName("");
    } catch (err: any) {
      console.log(err.message); // エラーメッセージをコンソールに出力
    }
  };

  // 指定したジャンルを削除する関数
  const onClickDelete = async (genre: GenreType) => {
    try {
      // genreRequestを使ってジャンルを削除
      const genres: GenreType[] = await genreRequest("deleteGenres", {
        data: genre,
      });
      // 更新後のジャンルデータで状態を更新
      dispatch({ type: "genresUpdate", payload: { genre: genres } });
    } catch (err: any) {
      console.log(err.message); // エラーメッセージをコンソールに出力
    }
  };

  return (
    // モーダル内のボディコンテナ
    <div className="modal_body">
      {/* モーダルの見出し */}
      <h2 className="input_menu">ジャンル編集</h2>
      {/* ジャンル一覧の表示 */}
      <ul>
        {data.genresData.map((genre: GenreType) => {
          return (
            // 各ジャンル項目（名前と削除アイコン）を表示
            <li className="genre_title" key={genre.id}>
              <span>{genre.name}</span>
              <CancelIcon onClick={() => onClickDelete(genre)} />
            </li>
          );
        })}
      </ul>
      {/* ジャンル名の入力フィールド */}
      <input type="text" value={genreName} onChange={changeGenreName} />
      {/* ジャンル追加ボタン */}
      <input
        className="input_submit"
        onClick={onClickSubmit}
        type="button"
        value="追加"
      />
    </div>
  );
};
