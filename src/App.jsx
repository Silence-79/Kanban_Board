import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: "Design homepage", status: "todo", important: false },
      { id: 2, title: "Build login API", status: "inprogress", important: false },
      { id: 3, title: "Deploy project", status: "done", important: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      title: newTask,
      status: "todo",
      important: false
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId) => {
    const newTitle = prompt("Edit task title:");

    if (!newTitle) return;

    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, title: newTitle } : task
    ));
  };

  const toggleImportant = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, important: !task.important }
        : task
    ));
  };

  return (
    
    <>
    <video autoPlay loop muted playsInline className="background-video">
      <source src="/bg.mp4" type="video/mp4" />
    </video>

    <div className="app">
      <h1 className="title">KANBAN TASK BOARD</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="board">

        <div
          className="column todo-column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = e.dataTransfer.getData("taskId");
            updateTaskStatus(Number(id), "todo");
          }}
        >
          <h2>To Do ❌</h2>
          {tasks
            .filter(task => task.status === "todo")
            .sort((a, b) => b.important - a.important)
            .map(task => (
              <div
                key={task.id}
                className={`task ${task.important ? "important" : ""}`}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
              >
                <div className="task-actions">
                  <span onClick={() => toggleImportant(task.id)}>
                    {task.important ? "⭐" : "☆"}
                  </span>
                  <span onClick={() => editTask(task.id)}>✏️</span>
                  <span onClick={() => deleteTask(task.id)}>🗑️</span>
                </div>

                {task.title}
              </div>
            ))}
        </div>

        <div
          className="column progress-column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = e.dataTransfer.getData("taskId");
            updateTaskStatus(Number(id), "inprogress");
          }}
        >
          <h2>In Progress ⏳</h2>
          {tasks
            .filter(task => task.status === "inprogress")
            .sort((a, b) => b.important - a.important)
            .map(task => (
              <div
                key={task.id}
                className={`task ${task.important ? "important" : ""}`}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
              >
                <div className="task-actions">
                  <span onClick={() => toggleImportant(task.id)}>
                    {task.important ? "⭐" : "☆"}
                  </span>
                  <span onClick={() => editTask(task.id)}>✏️</span>
                  <span onClick={() => deleteTask(task.id)}>🗑️</span>
                </div>

                {task.title}
              </div>
            ))}
        </div>

        <div
          className="column done-column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = e.dataTransfer.getData("taskId");
            updateTaskStatus(Number(id), "done");
          }}
        >
          <h2>Done ✅</h2>
          {tasks
            .filter(task => task.status === "done")
            .sort((a, b) => b.important - a.important)
            .map(task => (
              <div
                key={task.id}
                className={`task ${task.important ? "important" : ""}`}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
              >
                <div className="task-actions">
                  <span onClick={() => toggleImportant(task.id)}>
                    {task.important ? "⭐" : "☆"}
                  </span>
                  <span onClick={() => editTask(task.id)}>✏️</span>
                  <span onClick={() => deleteTask(task.id)}>🗑️</span>
                </div>

                {task.title}
              </div>
            ))}
        </div>

      </div>
    </div>
    </>
  );
}

export default App;