import { useGetTodos } from "../../features/todos/queries";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { TodoListItem } from "./TodoListItem";

export function TodoList() {
  const todosQuery = useGetTodos();

  if (todosQuery.isLoading) {
    return <Loading />;
  }

  if (todosQuery.isError) {
    return <Error />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans text-gray-900">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your daily goals.</p>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {todosQuery.data?.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} />
          ))}
        </ul>
        {todosQuery.data?.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">
            No tasks yet.
          </div>
        )}
      </div>
    </div>
  );
}