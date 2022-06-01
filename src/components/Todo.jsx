import React, { useState, useReducer } from "react";
import styles from "./Todo.module.css";
import TodoItem from "./TodoItem";

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: [...state.todos.filter((item) => item.id !== action.payload)]
      };
    case "TOGGLE":
      const updatedTodo = state.todos.map((item) =>
        item.id === action.payload
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      );
      return { ...state, todos: updatedTodo };

    default:
      return state;
  }
};
const Todo = () => {
  let [svalue, setSvalue] = useState("");
  const initialState = {
    todos: []
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [todos, setTodos] = useState([]);
  const handleChange = (e) => {
    setSvalue(e.target.value);
  };
  const handletoggle = (id) => {
    dispatch({ type: "TOGGLE", payload: id });
  };
  const Delete = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      if (svalue === "") return;
      dispatch({
        type: "ADD_TODO",
        payload: {
          id: Math.random(),
          text: svalue,
          isCompleted: false
        }
      });
      setSvalue("");
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        className={styles.box}
        value={svalue}
        placeholder="Write Something"
        onChange={handleChange}
        onKeyDownCapture={handleKeyUp}
      />
      <br />
      <br />

      <div className={styles.todolist}>
        {state.todos.map((todo) => (
          <div className={styles.box}>
            <div key={todo.id} className={styles.row}>
              <input
                type="checkbox"
                onChange={() => {
                  handletoggle(todo.id);
                }}
              />
              <div className={todo.isCompleted ? styles.striked : styles.box}>
                {" "}
                {todo.text}
              </div>
              <button onClick={() => Delete(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Todo;
