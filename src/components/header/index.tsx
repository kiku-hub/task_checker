// Reactライブラリをインポート
import React from "react";

// Material-UIからDoneAllアイコンをインポート
import DoneAll from "@material-ui/icons/DoneAll";

// スタイルシートをインポート
import "./style.css";

// Headerコンポーネントを定義してエクスポート
export const Header = () => {
  return (
    // ヘッダー全体のコンテナを定義（クラス名：header）
    <div className="header">
      {/* DoneAllアイコンを表示し、クラスとサイズを設定 */}
      <DoneAll className="header_icon" fontSize="large"></DoneAll>
      {/* タイトルを表示（クラス名：header_title） */}
      <span className="header_title">Task Checker</span>
    </div>
  );
};
