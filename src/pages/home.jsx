import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../ui/nav/NavBar";
import Grafico from "../components/grafico/Grafico";
import DataList from "../components/grafico/DataList";
import TaskList from "../components/taskList/TaskList";

export default function Home(props) {
  const [filter, setFilter] = useState("all");



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
                onFilterChange={handleFilterChange}
                filter={filter}
                tasksList={JSON.parse(localStorage.getItem("tasks")) || [
                  { id: 1, name: "Tarea 1", completed: false },
                  { id: 2, name: "Tarea 2", completed: false },
                  { id: 3, name: "Tarea 3", completed: false },
                ]}
              />
            }
          />
        </Routes>
      </Router>
      <props.Copyright />
    </div>
  );
}
