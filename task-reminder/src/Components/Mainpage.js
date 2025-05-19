import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import Header from "./Header";

function Mainpage() {
  const [Tasks, setTasks] = useState([]);

  

  const addTaskHandler = async (Task) => {
    try {
      const res = await fetch("http://localhost:8000/addtask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Task),
      });

      const result = await res.json();
      if (res.ok) {
        setTasks((prev) => [result.data[0], ...prev]);
      } else {
        alert(result.error || result.message);
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const removeTaskHandler = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/deletetask/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } else {
        const result = await res.json();
        alert("Failed to delete task: " + result.error);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };
  
  

  // const removeTaskHandler = (id) => {
  //   setTasks(Tasks.filter((task) => task.id !== id));
  // };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:8000/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="ui container">
      <Header />
      <AddTask addTaskHandler={addTaskHandler} />
      <TaskList Tasks={Tasks} getTaskId={removeTaskHandler} />
    </div>
  );
}

export default Mainpage;
