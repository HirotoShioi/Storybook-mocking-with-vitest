# Demonstration of using sb.mock() with Storybook and Vitest

This repository showcases how to use the `sb.mock()` function from Storybook to mock API responses for components during development and testing. It integrates Storybook with Vitest for seamless component testing.

Previously, Storybook was not able to utilize `Mock` in Vitest. However, with the introduction of `sb.mock()`, it is now possible to mock API responses directly within Storybook stories, enhancing the development experience.

## How to do it

1. In `preview.ts` define the module you want to mock using `sb.mock()`. For example:

```ts
import { sb } from 'storybook/test'

// Module you want to mock
sb.mock(import('../src/features/todos/queries.ts'))
```

2. In your story file (e.g., `TodoList.stories.tsx`), use the `sb.mock()` function to define the mock responses for your API calls:

```ts
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
```

## References

- [Next-generation module mocking in Storybook](https://storybook.js.org/blog/next-generation-module-mocking/)
- [Fully automocked modules](https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-modules#fully-automocked-modules)