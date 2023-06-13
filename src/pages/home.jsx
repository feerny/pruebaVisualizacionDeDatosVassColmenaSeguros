import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../ui/nav/NavBar";
import Grafico from "../components/grafico/Grafico";
import DataList from "../components/grafico/DataList";
import TaskList from "../components/taskList/TaskList";

export default function Home(props) {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
      { name: "Tarea 1", completed: false },
      { name: "Tarea 2", completed: false },
      { name: "Tarea 3", completed: false },
    ]
  );
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskName) => {
    const newTask = { name: taskName, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleTaskCompletion = (taskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskIndex, newTaskName) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].name = newTaskName;
    setTasks(updatedTasks);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Grafico />} />
          <Route exact path="/data" element={<DataList />} />
          <Route
            exact
            path="/tasks"
            element={
              <TaskList
                tasks={tasks}
                onAddTask={handleAddTask}
                onTaskCompletion={handleTaskCompletion}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
                onFilterChange={handleFilterChange}
                filter={filter}
              />
            }
          />
        </Routes>
      </Router>
      <props.Copyright />
    </div>
  );
}
