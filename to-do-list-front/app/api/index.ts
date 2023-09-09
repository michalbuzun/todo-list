interface CreateTodoItem {
  content: string;
}

interface UpdateTodoItem {
  id: number;
  done?: boolean;
  content?: string;
}

export async function fetchTodos() {
  const response = await fetch("http://localhost:3000/todos");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function addToddo(createTodo: CreateTodoItem) {
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTodo),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function removeToddo(id: number) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateToddo(updateToddo: UpdateTodoItem) {
  try {
    const response = await fetch(
      `http://localhost:3000/todos/${updateToddo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: updateToddo.done,
        }),
      }
    );
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}
