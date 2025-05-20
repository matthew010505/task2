import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import Header from "./Header";

function Mainpage() {
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8000/tasks?userId=${userId}`)
      .then(r => r.json())
      .then(setTasks)
      .catch(console.error);
  }, [userId]);

  const addTaskHandler = async ({ task, reminder }) => {
    const res = await fetch("http://localhost:8000/addtask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, reminder, userId }),
    });
    const { data } = await res.json();
    if (res.ok) setTasks(prev => [data, ...prev]);
  };

  const removeTaskHandler = async id => {
    await fetch(`http://localhost:8000/deletetask/${id}`, { method: "DELETE" });
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="ui container">
      <Header />
      <AddTask addTaskHandler={addTaskHandler} />
      <TaskList Tasks={tasks} getTaskId={removeTaskHandler} />
    </div>
  );
}

export default Mainpage;
