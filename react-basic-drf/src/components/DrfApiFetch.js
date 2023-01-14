import axios from "axios";
import React, { useEffect, useState } from "react";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [editedTask, setEditedTask] = useState([{ id: "", title: "" }]);
  const [id, setId] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks/", {
        // token認証
        headers: {
          Authorization: "Token 019eb5252f457af931968237c3c14a944c43366f",
        },
      })
      .then((res) => setTasks(res.data));
  }, []);

  const getTask = () => {
    axios
      .get(`http://localhost:8000/api/tasks/${id}/`, {
        // token認証
        headers: {
          Authorization: "Token 019eb5252f457af931968237c3c14a944c43366f",
        },
      })
      .then((res) => setSelectedTask(res.data));
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8000/api/tasks/${id}/`, {
        // token認証
        headers: {
          Authorization: "Token 019eb5252f457af931968237c3c14a944c43366f",
        },
      })
      // 削除したタスク以外を表示するようにする
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask([]);
        if (editedTask.id === id) {
          setEditedTask({ id: "", title: "" });
        }
      });
  };

  const newTask = (task) => {
    const data = {
      title: task.title,
    };
    axios
      .post(`http://localhost:8000/api/tasks/`, data, {
        // token認証
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 019eb5252f457af931968237c3c14a944c43366f",
        },
      })
      .then((res) => setTasks([...tasks, res.data]));
  };

  const editTask = (task) => {
    axios
      .put(`http://localhost:8000/api/tasks/${task.id}/`, task, {
        // token認証
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 019eb5252f457af931968237c3c14a944c43366f",
        },
      })
      .then((res) => {
        setTasks(
          tasks.map((task) => (task.id === editedTask.id ? res.data : task))
        );
        setEditedTask({ id: "", title: "" });
      });
  };

  const handleInputChange = () => (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.id}
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <button onClick={() => setEditedTask(task)}>
              <i className="fas fa-pen"></i>
            </button>
          </li>
        ))}
      </ul>

      <p>Set id</p>
      <input
        type="text"
        value={id}
        onChange={(evt) => {
          setId(evt.target.value);
        }}
      />
      <br />
      <button type="button" onClick={() => getTask()}>
        Get Task
      </button>
      {/* <button type="button" onClick={() => deleteTask()}>
        Delete Task
      </button> */}
      <h3>
        {selectedTask.title} {selectedTask.id}
      </h3>
      <br />
      <p>New Task</p>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        // 入力が変わったときにはしる
        onChange={handleInputChange()}
        placeholder="New Task"
        required
      />
      <br />
      {editedTask.id ? (
        <button type="button" onClick={() => editTask(editedTask)}>
          edit Task
        </button>
      ) : (
        <button type="button" onClick={() => newTask(editedTask)}>
          Create Task
        </button>
      )}
    </div>
  );
};

export default DrfApiFetch;
