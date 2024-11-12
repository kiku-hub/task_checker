export interface TaskType {
  id: number; // タスクを区別するためのID（数字）
  name: string; // タスクの名前（文字）
  explanation: string; // タスクの説明（文字）
  deadlineDate: string; // タスクの締切日（文字）
  status: number; // タスクの状態を表す番号（数字）
  genreId: number; // タスクが属するジャンルのID（数字）
}
// TaskType は、「タスク」のデータがどんな形かを決めています。これを使うことで、「タスクのID」「タスクの名前」「説明」「締切日」「状態」「ジャンルID」といった情報をひとまとめにして扱うことができます。
// 例えば、やることリストを作るときに、この形式に沿って「タスク」をいくつもリストに並べることができます。
