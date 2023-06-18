import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
const taskList = [
  {
    id: 1,
    title: "Mua thực phẩm",
    completed: false,
  },
  {
    id: 2,
    title: "Đọc sách",
    completed: true,
  },
  {
    id: 3,
    title: "Gặp bạn bè",
    completed: false,
  },
];
function App() {
  const [todos, setTodos] = useState(taskList);
  const [task, setTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  const handleOnChangeCheckboxed = (taskId) => {
    return todos.map((task) => {
      return taskId === task.id
        ? { ...task, completed: !task.completed }
        : task;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task != undefined && task != "") {
      const newTask = {
        id: todos.length + 1,
        title: task,
        completed: false,
      };
      setTodos([...todos, newTask]);
      setTask("");
    }
  };

  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
  };

  const handleUpdateTask = (e, taskId) => {
    setTodos((preTask) => {
      return preTask.map((task) => {
        if (task.id === taskId) {
          if (
            editTaskTitle == null &&
            editTaskTitle == "" &&
            editTaskTitle == undefined
          ) {
            setEditTaskTitle("Nothing");
          } else {
            return { ...task, title: editTaskTitle };
          }
        } else {
          return task;
        }
      });
    });

    setEditTaskId(null);
    setEditTaskTitle("");
  };

  const handleCancelUpdate = () => {
    setEditTaskId(null);
    setEditTaskTitle("");
  };

  const handleDeleteTask = (taskId) => {
    setTodos((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  return (
    <>
      <div className="add-task">
        {/* Input Task */}
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {/* Button Add task */}
        <button onClick={handleSubmit}>Add task</button>
      </div>

      {/* Show list task here */}
      <ul className="todo-list">
        {todos.length > 0 ? (
          todos.map((task) => {
            if (task.id === editTaskId) {
              return (
                <li key={task.id}>
                  <input
                    type="text"
                    name="task"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                  />
                  <button onClick={(e) => handleUpdateTask(e, task.id)}>
                    Save
                  </button>
                  <button onClick={handleCancelUpdate}>Cancel</button>
                  <input
                    type="checkbox"
                    onChange={(e) => handleOnChangeCheckboxed(e, task.id)}
                    value={task.completed}
                  />
                </li>
              );
            } else {
              return (
                <li key={task.id}>
                  <p>{task.title}</p>
                  <button onClick={() => handleEditTask(task.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  <input
                    type="checkbox"
                    onChange={(e) => handleOnChangeCheckboxed(e, task.id)}
                    value={task.completed}
                  />
                </li>
              );
            }
          })
        ) : (
          <p>No Task in here</p>
        )}
      </ul>
    </>
  );
}

export default App;
