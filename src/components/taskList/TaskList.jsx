import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
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
  Collapse,
  Alert,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

function TaskList({ tasksList, onFilterChange, filter }) {
  // Utilizar un Media Query para verificar el ancho de la pantalla
  const isMobile = useMediaQuery("(max-width: 600px)");
  // Estado de la alerta
  const [open, setOpen] = useState(false);
  // Recibe una lista de tareas como estado del componente
  const [tasks, setTasks] = useState(tasksList);
  const [newTask, setNewTask] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  // Función para generar ids aleatorios
  const generateRandomId = () => {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${randomSuffix}`;
  };
  // Función para agregar una tarea
  const onAddTask = (taskName) => {
    const validationData = tasks.some(
      (data) => data.name.toLowerCase() === taskName.toLowerCase()
    );
    if (validationData) {
      setOpen(true);
    } else {
      const newTask = {
        id: generateRandomId(),
        name: taskName,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  };
  // Función para marcar una tarea como completa o incompleta
  const onTaskCompletion = (taskIndex) => {
    const updatedTasks = tasks.map((data) =>
      data.id === taskIndex ? { ...data, completed: !data.completed } : data
    );
    setTasks(updatedTasks);
  };
  // Función para eliminar una tarea
  const onDeleteTask = (taskIndex) => {
    const updatedTasks = tasks.filter((data) => data.id !== taskIndex);
    setTasks(updatedTasks);
  };

  // Función para editar una tarea
  const onEditTask = (taskIndex, newTaskName) => {
    const updatedTasks = tasks.map((data) =>
      data.id === taskIndex ? { ...data, name: newTaskName } : data
    );
    setTasks(updatedTasks);
  };
  // Función para controlar el cambio de estado del input para agregar nueva tarea
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };
  // Función para agregar una nueva tarea
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onAddTask(newTask);
      setNewTask("");
    }
  };
  // Función para controlar el cambio de filtro
  const handleFilter = (event) => {
    onFilterChange(event.target.value);
  };
  // Función para iniciar la edición de una tarea
  const handleStartEditingTask = (taskIndex, taskName) => {
    setEditTaskIndex(taskIndex);
    setEditTaskName(taskName);
  };
  // Función para cancelar la edición de una tarea
  const handleCancelEditingTask = () => {
    setEditTaskIndex(null);
    setEditTaskName("");
  };
  // Función para guardar los cambios realizados en la tarea editada
  const handleSaveEditedTask = (taskIndex) => {
    onEditTask(taskIndex, editTaskName);
    setEditTaskIndex(null);
    setEditTaskName("");
  };
  // Filtra las tareas según el filtro seleccionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "incomplete") {
      return !task.completed;
    } else {
      return task;
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
        <Collapse in={open}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Tarea ya agregada
          </Alert>
        </Collapse>

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
        <Box sx={{maxHeight: isMobile ? "43vh" : 240, overflowY: "scroll", mt: 2 }}>
          <List>
            {filteredTasks.map((task, index) => (
              <ListItem
                sx={{ padding: "0px 10px 0px 10px" }}
                key={task.id}
                disablePadding
                secondaryAction={
                  <ListItemSecondaryAction>
                    {editTaskIndex === index ? (
                      <Box sx={{ display: "flex" }}>
                        <IconButton
                          disabled={editTaskName === ""}
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
                          onClick={() =>
                            handleStartEditingTask(index, task.name)
                          }
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
                          task.completed
                            ? { textDecoration: "line-through" }
                            : {}
                        }
                      />
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          No hay tareas
        </Typography>
      )}
    </Box>
  );
}

export default TaskList;
