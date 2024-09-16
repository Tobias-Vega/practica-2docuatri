import { conn } from '../database/db.js';

// Obtener todos los usuarios
export const allUsersCtrl = async (_req, res) => {
  try {
    const [result] = await conn.query(`SELECT * FROM users`);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({ msg: 'Error interno del servidor' });
  };
};
// Crear usuarios
export const createUserCtrl = async (req, res) => {
  const { username, password, email } = req.body

  try {
    const [result] = await conn.execute(`INSERT INTO users (username, password, email) VALUES (?,?,?)`, [username, password, email]);

    const [userFinded] = await conn.execute(`SELECT * FROM users WHERE id = ?`, [result.insertId]);

    res.status(201).json(userFinded[0]);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
}

// Obtener usuario por id
export const getUserIdCtrl = async (req, res) => {
  const userId = parseInt(req.params.id)

  try {
    const [result] = await conn.execute(`SELECT * FROM users WHERE id = ?`, [userId]);

    if (result.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    };

    res.status(200).json(result[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
}

// Actualizar usuario
export const upadteUserCtrl = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, password, email } = req.body;

  try {
    const [result] = await conn.execute(`UPDATE users SET username=?, email=?, password=? WHERE id = ?`, [username, email, password, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    };

    const [userFinded] = await conn.execute(`SELECT * FROM users WHERE id = ?`, [userId]);

    res.status(200).json(userFinded[0])

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
}

// Eliminar usuario
export const deleteUserCtrl = async (req,res) => {
  const userId = parseInt(req.params.id);
  try {
    const [result] = await conn.execute(`DELETE FROM users WHERE id = ?`, [userId]);

    if (result.affectedRows === 0) {
      res.status(404).json({ msg: 'Usuario no encontrado' });
    };

    res.status(200).json({ msg: 'Usuario eliminado exitosamente' })

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
}