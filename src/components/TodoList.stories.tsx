import type { Meta, StoryObj } from '@storybook/react-vite';
import { TodoList } from './TodoList';
import { useGetTodos } from '../features/todos/queries';
import type { Mock } from 'vitest';

const meta: Meta<typeof TodoList> = {
  title: 'Components/TodoList',
  component: TodoList,
};

export default meta;
type Story = StoryObj<typeof TodoList>;

export const Default: Story = {
  beforeEach: () => {
    (useGetTodos as unknown as Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        { id: 1, title: 'Learn Storybook', completed: false },
        { id: 2, title: 'Build a Todo App', completed: true },
        { id: 3, title: 'Master Tailwind CSS', completed: false },
      ],
    });
  },
};

export const Loading: Story = {
  beforeEach: () => {
    (useGetTodos as unknown as Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });
  },
};

export const Error: Story = {
  beforeEach: () => {
    (useGetTodos as unknown as Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
    });
  },
};

export const Empty: Story = {
  beforeEach: () => {
    (useGetTodos as unknown as Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [],
    });
  },
};
