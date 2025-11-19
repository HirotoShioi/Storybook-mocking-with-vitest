import type { Meta, StoryObj } from '@storybook/react-vite';
import { TodoList } from './TodoList';
import { useGetTodos } from '../../features/todos/queries';
import type { Mock } from 'vitest';
import { within, expect } from 'storybook/test';

const meta: Meta<typeof TodoList> = {
  title: 'Components/TodoList',
  component: TodoList,
};

export default meta;
type Story = StoryObj<typeof TodoList>;

const useGetTodosMock = (useGetTodos as unknown as Mock).mockReturnValue({
  isLoading: false,
  isError: false,
  data: [],
});

export const Default: Story = {
  beforeEach: () => {
    useGetTodosMock.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        { id: 1, title: 'Learn Storybook', completed: false },
        { id: 2, title: 'Build a Todo App', completed: true },
        { id: 3, title: 'Master Tailwind CSS', completed: false },
      ],
    });
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Tasks')).toBeInTheDocument();
    await expect(canvas.getByText('Manage your daily goals.')).toBeInTheDocument();

    await expect(canvas.getByText('Learn Storybook')).toBeInTheDocument();
    await expect(canvas.getByText('Build a Todo App')).toBeInTheDocument();
    await expect(canvas.getByText('Master Tailwind CSS')).toBeInTheDocument();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);

    const firstCheckbox = within(items[0]).getByRole('checkbox');
    await expect(firstCheckbox).not.toBeChecked();

    const secondCheckbox = within(items[1]).getByRole('checkbox');
    await expect(secondCheckbox).toBeChecked();
  },
};

export const Loading: Story = {
  beforeEach: () => {
    useGetTodosMock.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText('Tasks')).not.toBeInTheDocument();
  },
};

export const Error: Story = {
  beforeEach: () => {
    useGetTodosMock.mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
    });
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Error loading todos. Please try again later.')).toBeInTheDocument();
  },
};

export const Empty: Story = {
  beforeEach: () => {
    useGetTodosMock.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [],
    });
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No tasks yet.')).toBeInTheDocument();
  },
};
