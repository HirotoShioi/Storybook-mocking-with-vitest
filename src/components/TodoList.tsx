import { useGetTodos } from "../features/todos/queries";

export function TodoList() {
  const todosQuery = useGetTodos();

  if (todosQuery.isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (todosQuery.isError) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg text-sm">
          Error loading todos. Please try again later.
        </div>
      </div>
    );
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
            <li 
              key={todo.id} 
              className="group flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  readOnly 
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white checked:bg-black checked:border-black transition-all focus:ring-2 focus:ring-gray-200 focus:outline-none"
                />
                <svg 
                  className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  width="14" 
                  height="14"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className={`text-sm font-medium transition-colors ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {todo.title}
              </span>
            </li>
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