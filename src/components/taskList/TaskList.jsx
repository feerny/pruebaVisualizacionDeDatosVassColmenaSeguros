//importaciones
import React, { useState, useEffect } from "react";
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
  //estado de la alerta
  const [open, setOpen] = useState(false);
  //recibe una lista de tareas como estado del componente
  const [tasks, setTasks] = useState(tasksList);
  const [newTask, setNewTask] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //funcion para generar ids randoms
  const generateRandomId = () => {
    //guarda un número que representa la fecha y hora actual.
    const timestamp = Date.now();
    //genera una cadena string aleatoria
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    //oncatena
    return `${timestamp}-${randomSuffix}`;
  };
  //funcion para agregar tarea
  const onAddTask = (taskName) => {
    //fintra el nombre de la nueva tarea para saber si ya existe
    const validationdata = tasks.some((data) => data.name === taskName);
    //si existe muestra alerta
    if (validationdata) {
        setOpen(true)
    } else {
      //si no existe crea una nueva tarea y la agrega a la lista de tareas
      const newTask = {
        id: generateRandomId(),
        name: taskName,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  };
  //funcion par marcar tarea como completa o desmarcarla
  const onTaskCompletion = (taskIndex) => {
    //si el id pasado es igual al mapeado entra y cambia complete por el nuevo valor
    const updatedTasks = tasks.map((data) => 
      data.id === taskIndex ? { ...data, completed: !data.completed } : data
    );
    setTasks(updatedTasks);
  };
  //funcion para eliminar tarea
  const onDeleteTask = (taskIndex) => {
    //filtra las tareas menos la eliminada y las manda al estado del componente
    const updatedTasks = tasks.filter((data) => data.id !== taskIndex);
    setTasks(updatedTasks);
  };

  //funcion para editar tarea
  const onEditTask = (taskIndex, newTaskName) => {
    //si el id pasado es igual al mapeado devuelve la tarea con el nombre modificado
    const updatedTasks = tasks.map((data,) => 
      data.id === taskIndex ? { ...data, name: newTaskName } : data
    );
    setTasks(updatedTasks);
  };
  //funcion que controla el cambio de estado del input de agregar nueva tarea
  const handleInputChange = (event) => {
    //actualiza el estado por el nuevo valor
    setNewTask(event.target.value);
  };
  //funcion para agregar nueva tarea
  const handleAddTask = () => {
    //si la tarea no esta en blanco envia la tarea a la funcion de agregarla a la lista y limpia el input
    if (newTask.trim() !== "") {
      onAddTask(newTask);
      setNewTask("");
    }
  };
  //funcion para controlar el cambio de filtro
  const handleFilter = (event) => {
    onFilterChange(event.target.value);
  };
  //funcion para edicion
  const handleStartEditingTask = (taskIndex, taskName) => {
    //actualiza el estado del indice de la tarea que se esta editando
    setEditTaskIndex(taskIndex);
    //actualiza el nombre de la tarea que se esta actualizando
    setEditTaskName(taskName);
  };
  //funcion para cancelar la edicion
  const handleCancelEditingTask = () => {
    //actualiza el estado del idice de edicion a null
    setEditTaskIndex(null);
    //actualiza el estado del nombre de la tarea a ""
    setEditTaskName("");
  };
  //funcion para guardar los cambios aplicados
  const handleSaveEditedTask = (taskIndex) => {
    //envia el id de la tarea y el nuevo nombre a la funcion de editar tarea
    onEditTask(taskIndex, editTaskName);
    //vuelve a dejar null el indice de la tarea en edicion
    setEditTaskIndex(null);
    //vacia el nombre de la tarea editada
    setEditTaskName("");
  };
//filtra las tareas segun el filtro seleccionado
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
        <List sx={{ mt: 2 }}>
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
