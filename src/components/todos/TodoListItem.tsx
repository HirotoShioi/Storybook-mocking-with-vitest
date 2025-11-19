import type { TodoItem } from "../../features/todos/model";

type TodoListItemProps = {
  todo: TodoItem;
};

export function TodoListItem({ todo }: TodoListItemProps) {
  return (
    <li 
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
  );
}
