// Reactライブラリとジャンルの型定義をインポート
import React from "react";
import { GenreType } from "../../interfaces/GenreType";
import "./style.css";

// Propsインターフェースを定義
interface Props {
  genres?: GenreType[]; // ジャンルの配列（任意）
  changeSelect?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // セレクト変更時のイベントハンドラ（任意）
  optionElements?: string[]; // 文字列の配列としてのオプションリスト（任意）
  initialValue?: number; // 初期選択値（任意）
}

// オプションを描画するための関数
const renderOption = (props: Props) => {
  if (props.genres !== undefined) {
    // ジャンルが提供されている場合、ジャンルリストをオプションとして描画
    return (
      props.genres &&
      props.genres.map((genre: GenreType) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))
    );
  } else if (props.optionElements !== undefined) {
    // カスタムオプションリストが提供されている場合、リストの値をオプションとして描画
    const values = props.optionElements;
    return values.map((val, index) => (
      <option key={val} value={index}>
        {val}
      </option>
    ));
  }
};

// Selectコンポーネントを定義
export const Select = (props: Props) => {
  return (
    // セレクトボックスを描画
    <select
      className="select"
      onChange={props.changeSelect} // 選択変更時のイベントハンドラ
      value={props.initialValue} // 初期選択値を設定
    >
      {/* genresが存在する場合、空のデフォルトオプションを追加 */}
      {props.genres !== undefined && <option value={0}></option>}
      {/* オプションの描画 */}
      {renderOption(props)}
    </select>
  );
};
