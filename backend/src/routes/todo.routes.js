import { Router } from 'express';
import validarJWT from '../middlewares/validarJWT.js';
import { getAllTodosCtrl, createTask, updateTask, deleteTask } from '../controllers/todo.controller.js';

const todosRoutes = Router();

// Obtener todas las tareas
todosRoutes.get('/todos', validarJWT, getAllTodosCtrl);

// Crear una nueva tarea
todosRoutes.post('/todos', validarJWT, createTask);

// Actualizar una tarea
todosRoutes.put('/todos/:id', validarJWT, updateTask);

// Eliminar una tarea
todosRoutes.delete('/todos/:id', validarJWT, deleteTask);

// Validar sesión
todosRoutes.get('/session', validarJWT);

export { todosRoutes };
