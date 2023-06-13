import React, { useState,useEffect } from "react";
import {
  TextField,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  FormControlLabel,
  FormGroup,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

function TaskList({tasksList, onFilterChange, filter }) {
  const [tasks, setTasks] = useState(tasksList);
  const [newTask, setNewTask] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(-1);
  const [editTaskName, setEditTaskName] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //funcion para generar ids randoms
  const generateRandomId = () => {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${randomSuffix}`;
  };
  const onAddTask = (taskName) => {
    const newTask = {
      id: generateRandomId(),
      name: taskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const onTaskCompletion = (taskIndex) => {
    const updatedTasks = tasks.map((data, index) => {
      if (data.id === taskIndex) {
        const newData = {
          id: tasks[index].id,
          name: tasks[index].name,
          completed: !tasks[index].completed,
        };
        return newData;
      } else {
        return data;
      }
    });
    setTasks(updatedTasks);
  };

  const onDeleteTask = (taskIndex) => {
    const updatedTasks = tasks.filter((data) => data.id !== taskIndex);
    setTasks(updatedTasks);
  };

  const onEditTask = (taskIndex, newTaskName) => {
    const updatedTasks = tasks.map((data, index) => {
      if (data.id === taskIndex) {
        const newData = {
          id: tasks[index].id,
          name: newTaskName,
          completed: tasks[index].completed,
        };
        return newData;
      } else {
        return data;
      }
    });
    setTasks(updatedTasks);
  };

  //////

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  const handleFilter = (event) => {
    onFilterChange(event.target.value);
  };

  const handleStartEditingTask = (taskIndex, taskName) => {
    setEditTaskIndex(taskIndex);
    setEditTaskName(taskName);
  };

  const handleCancelEditingTask = () => {
    setEditTaskIndex(-1);
    setEditTaskName("");
  };

  const handleSaveEditedTask = (taskIndex) => {
    onEditTask(taskIndex, editTaskName);
    setEditTaskIndex(-1);
    setEditTaskName("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "incomplete") {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <Box maxWidth={400} mx="auto">
      <Typography
        color="text.secondary"
        variant="h3"
        sx={{ padding: "15px" }}
        align="center"
        gutterBottom
      >
        Listado de tareas
      </Typography>

      <FormGroup>
        <TextField
          label="Nueva tarea"
          value={newTask}
          onChange={handleInputChange}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          fullWidth
          disabled={newTask.trim() === ""}
          sx={{ mt: 2 }}
        >
          Agregar
        </Button>
      </FormGroup>

      <FormControlLabel
        control={
          <Checkbox
            checked={filter === "completed"}
            onChange={handleFilter}
            value="completed"
          />
        }
        label="Completas"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={filter === "incomplete"}
            onChange={handleFilter}
            value="incomplete"
          />
        }
        label="Incompletas"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={filter === "all"}
            onChange={handleFilter}
            value="all"
          />
        }
        label="Todas"
      />

      {filteredTasks.length > 0 ? (
        <List sx={{ mt: 2 }}>
          {filteredTasks.map((task, index) => (
            <ListItem
              key={task.id}
              disablePadding
              secondaryAction={
                <ListItemSecondaryAction>
                  {editTaskIndex === index ? (
                    <Box sx={{ display: "flex" }}>
                      <IconButton
                        disabled={editTaskName === "" ? true : false}
                        edge="end"
                        aria-label="save"
                        onClick={() => handleSaveEditedTask(task.id)}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="cancel"
                        onClick={handleCancelEditingTask}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex" }}>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleStartEditingTask(index, task.name)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </ListItemSecondaryAction>
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.completed}
                    onChange={() => onTaskCompletion(task.id)}
                  />
                }
                label={
                  editTaskIndex === index ? (
                    <TextField
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                    />
                  ) : (
                    <ListItemText
                      primary={task.name}
                      sx={
                        task.completed ? { textDecoration: "line-through" } : {}
                      }
                    />
                  )
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          No hay tareas
        </Typography>
      )}
    </Box>
  );
}

export default TaskList;
