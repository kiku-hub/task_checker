// web-vitalsというライブラリから、ReportHandlerというものを取り込む
import { ReportHandler } from "web-vitals";

// アプリの速さや性能を測るための関数を定義
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  // onPerfEntryがあって、かつそれが関数である場合
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // web-vitalsからいくつかの測定方法を取り込む
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // アプリの性能を測定するための関数を順番に実行
      getCLS(onPerfEntry); // 画面が変わるときの安定性を測る
      getFID(onPerfEntry); // 最初に画面を操作できるようになる速さを測る
      getFCP(onPerfEntry); // 最初に内容が表示される速さを測る
      getLCP(onPerfEntry); // 一番大きな内容が表示される速さを測る
      getTTFB(onPerfEntry); // サーバーからの最初の応答時間を測る
    });
  }
};

// この関数を他のファイルでも使えるようにする
export default reportWebVitals;

// reportWebVitals関数 は、アプリの速さや性能を測るためのものです。
// この関数では、web-vitals という道具を使って、画面の表示速度やサーバーとの通信の速さを測ります。
// getCLS, getFID, getFCP, getLCP, getTTFB はそれぞれ違う種類の速さや安定性を測ります。これらを使うと、アプリがどれくらい速く反応するかや、画面がどれくらい安定しているかを確認できます。
