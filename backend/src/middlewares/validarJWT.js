import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../settings/environments.js';
import { conn } from '../database/db.js';

const validarJWT = async (req, res, next) => {
  const token = req.cookies.authToken || req.session.token;

  if (!token) {
    return res.status(401).json({ msg: 'No se proporcionó token' });
  }

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, SECRET_KEY);

    // Obtener el usuario de la base de datos
    const [user] = await conn.query('SELECT * FROM users WHERE id = ?', [decoded.userId]);

    if (!user || user.length === 0) {
      return res.status(401).json({ msg: 'Token inválido' });
    }

    // Asignar el usuario a req.user para rutas protegidas
    req.user = user[0];
    next();
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return res.status(500).json({ msg: 'Error al verificar el token' });
  }
};

export default validarJWT;
