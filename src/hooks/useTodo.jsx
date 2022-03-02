import { useEffect, useState } from "react";
import configs from "../configs";
import useLocalStorage from "./useLocalStorage";

const useTodo = () => {
  const [todoList, setTodoList] = useState([]);
  const [addTodo, setAddTodo] = useState("");
  const [updateTodo, setUpdateTodo] = useState("");
  const [deleteTodo, setDeleteTodo] = useState("");
  const { stayToken } = useLocalStorage();

  /**
   * Get all todos
   */
  useEffect(() => {
    fetch(`${configs.serverUrl}/api/todos`, {
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        //   If error occurred to the server
        if (!success) {
          return;
        }

        if (data) {
          setTodoList((todoList) => [...todoList, ...data]);
        }
      });
  }, [stayToken]);

  /**
   * Handle add todo
   */
  useEffect(() => {
    if (!addTodo) {
      return;
    }

    fetch(`${configs.serverUrl}/api/add-todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
      body: JSON.stringify({
        todo: addTodo.trim(),
      }),
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        //   If error occurred to the server
        if (!success) {
          return;
        }

        if (data) {
          setTodoList((todoList) => [...todoList, { ...data }]);
          setAddTodo("");
        }
      });
  }, [stayToken, addTodo]);

  /**
   * Handle update todo
   */
  useEffect(() => {
    if (!updateTodo) {
      return;
    }

    fetch(`${configs.serverUrl}/api/update-todo?todoId=${updateTodo._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
      body: JSON.stringify({
        todo: updateTodo.todo,
        completed: updateTodo.completed,
      }),
    })
      .then((res) => res.json())
      .then(({ success, data, message }) => {
        console.log(message);
        if (!success) {
          return;
        }

        if (data) {
          const newTodoList = todoList.map((todos) => {
            if (todos._id === data._id) {
              todos.completed = data.completed;
              todos.todo = data.todo;
            }

            return todos;
          });

          setTodoList(newTodoList);
          setUpdateTodo("");
        }
      });
  }, [stayToken, updateTodo, todoList]);

  /**
   * Handle delete todo
   */
  useEffect(() => {
    if (!deleteTodo) {
      return;
    }

    fetch(`${configs.serverUrl}/api/delete-todo?todoId=${deleteTodo}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        //   If error occurred to the server
        if (!success) {
          return;
        }

        if (data) {
          const newTodoList = todoList.filter(({ _id }) => _id !== data._id);
          setTodoList(newTodoList);
        }
      });

    setDeleteTodo("");
  }, [stayToken, addTodo, todoList, deleteTodo]);

  return { todoList, setAddTodo, setUpdateTodo, setDeleteTodo };
};

export default useTodo;
