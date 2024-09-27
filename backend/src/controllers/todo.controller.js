import { conn } from "../database/db.js";

export const getAllTodosCtrl = async (req, res) => {
  try {
    const [todos] = await conn.query('SELECT * FROM todos WHERE owner_id = ?', [req.user.id]);

    return res.json({ todos });
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    return res.status(500).json({ msg: 'Error al obtener las tareas' });
  }
};

export const createTask = async (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ msg: 'El campo title es obligatorio' });
  }

  try {
    // Insertar una nueva tarea en la base de datos
    const [result] = await conn.query(
      'INSERT INTO todos (title, completed, owner_id) VALUES (?, ?, ?)',
      [title, completed || false, req.user.id]
    );

    // Obtener la tarea recién creada
    const [newTask] = await conn.query('SELECT * FROM todos WHERE id = ?', [result.insertId]);

    return res.status(201).json({ newTask: newTask[0] });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return res.status(500).json({ msg: 'Error al crear la tarea' });
  }
};

export const updateTask = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  try {
    // Comprobar si la tarea pertenece al usuario
    const [task] = await conn.query('SELECT * FROM todos WHERE id = ? AND owner_id = ?', [id, req.user.id]);

    if (task.length === 0) {
      return res.status(404).json({ msg: 'Tarea no encontrada' });
    }

    // Actualizar la tarea
    await conn.query(
      'UPDATE todos SET title = IFNULL(?, title), completed = IFNULL(?, completed) WHERE id = ? AND owner_id = ?',
      [title, completed, id, req.user.id]
    );

    return res.status(200).json({ msg: 'Tarea actualizada' });
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    return res.status(500).json({ msg: 'Error al actualizar la tarea' });
  }
};

export const deleteTask = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // Comprobar si la tarea pertenece al usuario
    const [task] = await conn.query('SELECT * FROM todos WHERE id = ? AND owner_id = ?', [id, req.user.id]);

    if (task.length === 0) {
      return res.status(404).json({ msg: 'Tarea no encontrada' });
    }

    // Eliminar la tarea
    await conn.query('DELETE FROM todos WHERE id = ? AND owner_id = ?', [id, req.user.id]);

    return res.status(200).json({ msg: 'Tarea eliminada' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    return res.status(500).json({ msg: 'Error al eliminar la tarea' });
  }
};
