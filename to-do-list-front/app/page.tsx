"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchTodos, addToddo, removeToddo, updateToddo } from "./api";

type TodoItem = {
  id: number;
  content: string;
  done: boolean;
};

export default function Todos() {
  const [newItemContent, setNewItemContent] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addToddo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const { mutateAsync: removeTodoMutation } = useMutation({
    mutationFn: removeToddo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const { mutateAsync: updateTodoMutation } = useMutation({
    mutationFn: updateToddo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  async function handleAddItem() {
    setNewItemContent("");
    try {
      await addTodoMutation({
        content: newItemContent,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDeleteItem(id: number) {
    await removeTodoMutation(id);
  }

  async function handleUpdateItem(id: number, done: boolean) {
    updateTodoMutation({
      id: id,
      done: !done,
    });
  }

  if (isLoading) {
    return <div>Loading ....</div>;
  }

  return (
    <main>
      <p>Todo list:</p>
      <input
        value={newItemContent}
        onChange={(e) => setNewItemContent(e.target.value)}
      />
      <button onClick={handleAddItem} disabled={newItemContent.length === 0}>
        Add
      </button>
      <ul>
        {todos.map((todo: TodoItem) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.done || false}
                onChange={() => handleUpdateItem(todo.id, todo.done)}
              />
              {todo.done ? <s>{todo.content}</s> : todo.content}
              <button onClick={() => handleDeleteItem(todo.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
