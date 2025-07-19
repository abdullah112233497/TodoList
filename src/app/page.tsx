'use client';

import { useState } from "react";
import { CheckCircle, Trash2, PlusCircle } from "lucide-react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const addTodo = () => {
    const trimmed = newTodo.trim();
    if (trimmed === "") return;

    const isDuplicate = todos.some(todo => todo.text.toLowerCase() === trimmed.toLowerCase());

    if (isDuplicate) {
      alert("❌ Same item can't be added twice!");
      return;
    }

    const newTask: Todo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTodos([newTask, ...todos]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    const justMarkedDone = updatedTodos.find((todo) => todo.id === id)?.completed;

    setTodos(updatedTodos);

    if (justMarkedDone) {
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 10000);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative text-black">
      {showOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md flex flex-col items-center justify-center z-50 text-white text-center">
          <p className="text-3xl font-bold mb-2">Verification Completed</p>
          <p className="text-sm">Made by Abdullah</p>
        </div>
      )}

      <div className="bg-white w-full max-w-xl shadow-xl rounded-xl p-6 z-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">📝 To-Do List</h1>

        <div className="flex mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Enter a task..."
            className="flex-grow border border-gray-300 p-3 rounded-l-xl focus:outline-none text-black"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-5 rounded-r-xl hover:bg-blue-700 transition"
          >
            <PlusCircle className="inline-block mr-1" size={20} />
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border"
            >
              <span
                className={`flex-grow text-black ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
              <div className="flex gap-4 items-center">
                <button onClick={() => toggleComplete(todo.id)}>
                  <CheckCircle
                    size={24}
                    className={`cursor-pointer transition ${
                      todo.completed ? "text-green-600" : "text-gray-400 hover:text-green-600"
                    }`}
                  />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <Trash2 size={20} className="text-red-500 hover:text-red-700 cursor-pointer" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
