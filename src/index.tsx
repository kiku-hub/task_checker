// Reactというライブラリを使えるようにする
import React from "react";
// ReactDOMという画面に表示するための道具を取り込む
import ReactDOM from "react-dom/client";
// アプリ全体のデザイン（CSSファイル）を取り込む
import "./index.css";
// ホーム画面のページを取り込む
import { Home } from "./pages/home";
// アプリのパフォーマンス（速さや効率）を測るための道具を取り込む
import reportWebVitals from "./reportWebVitals";

// アプリを表示する場所（rootというIDの場所）を探して、そこに「root」を作る
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// 「root」にアプリの内容を表示する
root.render(
  <React.StrictMode>
    <Home /> {/* ホーム画面を表示する */}
  </React.StrictMode>
);

// アプリの速さや効率を測りたいときに、結果を出すための設定
// （必要ないときは何もしない）
reportWebVitals();

// このコードはアプリの「スタート地点」です。ここからアプリが始まります。
// root.render の部分で、画面に Home というページを表示します。
// reportWebVitals は、アプリの動きの速さなどを調べたいときに使うものですが、普段は特に何もしていません。
