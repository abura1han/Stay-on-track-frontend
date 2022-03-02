import React, { useEffect, useState } from "react";
import useTodo from "../hooks/useTodo";

const TodoPage = () => {
  const { todoList, setAddTodo, setUpdateTodo, setDeleteTodo } = useTodo();
  const [todo, setTodo] = useState("");
  const [modifyTodo, setModifyTodo] = useState("");
  const [modifyTodoId, setModifyTodoId] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  /**
   * Handle add todo
   */
  useEffect(() => {
    if (isSubmit) {
      setAddTodo(todo);

      // Clear todo form
      setTodo("");
      setIsSubmit(false);
    }
  }, [isSubmit, setAddTodo, todo]);

  return (
    <div className="w-full max-w-[800px] mx-auto px-3 mb-10 shadow shadow-gray-300 border border-gray-300 rounded">
      <h2 className="text-xl font-medium my-2">Todo</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (todo) {
              setIsSubmit(true);
            }
          }}
          className="flex"
        >
          <input
            type="text"
            placeholder="Add todo..."
            className="border border-gray-200 px-2 py-2 text-base rounded-l outline-none focus:border-stay-primary hover:border-stay-primary w-full"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button
            className="flex items-center px-2 py-2 bg-gray-300 rounded-r text-gray-600"
            type="submit"
          >
            <span className="material-icons-outlined">add</span>
          </button>
        </form>
      </div>
      <div>
        {/* Habit edit form */}
        {isEdit && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (modifyTodo) {
                setIsSubmit(true);
                setUpdateTodo({ _id: modifyTodoId, todo: modifyTodo });
                setIsEdit(false);
                setModifyTodo("");
              }
            }}
            className="flex absolute z-10"
          >
            <input
              type="text"
              placeholder="Update Todo..."
              className="border border-gray-200 px-2 py-2 text-base rounded-l outline-none focus:border-stay-primary hover:border-stay-primary w-full"
              onChange={(e) => setModifyTodo(e.target.value)}
              value={modifyTodo}
            />
            <button
              className="flex items-center px-2 py-2 bg-green-500 rounded-r text-white"
              type="submit"
            >
              <span className="material-icons-outlined">check</span>
            </button>
          </form>
        )}
        <ul className="mb-2 mt-5">
          {todoList &&
            todoList.map(({ _id, todo, completed }, i) => (
              <li key={i}>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    <button
                      className="flex border hover:border-gray-300 focus:border-gray-300 rounded"
                      onClick={(e) =>
                        setUpdateTodo({ _id, completed: !completed, todo })
                      }
                    >
                      <span className="material-icons-outlined">done</span>
                    </button>
                    <button
                      className="flex border ml-2 hover:border-gray-300 focus:border-gray-300 rounded"
                      onClick={(e) => {
                        setModifyTodoId(_id);
                        setIsEdit(!isEdit);
                      }}
                    >
                      <span className="material-icons-outlined">edit</span>
                    </button>
                    <button
                      className="flex border ml-2 hover:border-gray-300 focus:border-gray-300 rounded"
                      onClick={(e) => {
                        setDeleteTodo(_id);
                      }}
                    >
                      <span className="material-icons-outlined">close</span>
                    </button>
                  </div>
                  <div className="ml-2 flex-1">
                    <input
                      type="text"
                      className={`px-2 py-2 border rounded w-full font-medium ${
                        completed
                          ? "border-green-600 bg-green-200 italic font-bold"
                          : "border-gray-300"
                      }`}
                      value={todo}
                      onChange={() => true}
                    />
                  </div>
                </div>
              </li>
            ))}
          {todoList.length < 1 && (
            <li className="text-gray-500 mt-2">No todos found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;
