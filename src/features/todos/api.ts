// 無料で使えるTodo APIのURL
const API_URL = "https://jsonplaceholder.typicode.com/todos";

export type TodoItem = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export async function fetchTodos() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  const todos = await response.json();
  return (todos as TodoItem[]).slice(0, 10); // 最初の10件だけ返す
}
