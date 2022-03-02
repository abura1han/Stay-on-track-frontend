import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTodo from "../hooks/useTodo";

const Todo = () => {
  const { todoList, setUpdateTodo, setDeleteTodo } = useTodo();
  const [isTodoFormShow, setIsTodoFormShow] = useState(false);

  return (
    <div className="bg-white  border border-gray-300 relative rounded p-2 overflow-y-auto z-0 shadow shadow-gray-300">
      <h2 className="font-semibold text-black text-base text-left flex items-center justify-between">
        <div>Todo</div>
        <Link
          to={"/stay/todo"}
          className="flex items-center"
          onClick={() => setIsTodoFormShow(!isTodoFormShow)}
        >
          <span className="material-icons-outlined">add_task</span>
        </Link>
      </h2>
      <div className="w-full h-full rounded">
        <ul className="mt-4">
          {todoList &&
            todoList.map(({ _id, todo, completed }, i) => (
              <li key={i}>
                {/* Show only 5 todos */}
                {i < 5 && (
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      <button
                        className="flex border hover:border-gray-300 focus:border-gray-300 rounded"
                        onClick={() => setDeleteTodo(_id)}
                      >
                        <span className="material-icons-outlined">close</span>
                      </button>
                      <button
                        className="flex ml-1 border hover:border-gray-300 focus:border-gray-300 rounded"
                        onClick={() =>
                          setUpdateTodo({ _id, completed: !completed, todo })
                        }
                      >
                        <span className="material-icons-outlined">done</span>
                      </button>
                    </div>
                    <div className="ml-2 flex-1">
                      <input
                        type="text"
                        value={todo}
                        className={`px-2 py-2 border border-gray-300 rounded w-full font-medium ${
                          completed
                            ? "border-green-600 bg-green-100 italic font-bold"
                            : "text-gray-700"
                        }`}
                        readOnly
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          {todoList.length < 1 && (
            <li className="text-gray-500 mt-2">No todos found</li>
          )}
          {todoList.length > 4 && (
            <li className="mt-2">
              {todoList.length - 5} more todos{" "}
              <Link
                to={"/stay/todo"}
                className="font-medium text-stay-primary hover:underline"
              >
                show all
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
