import { conn } from '../database/db.js';
import generarJWT from '../helpers/generarJWT.js';

export const signInCtrl = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await conn.query(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password]);

    if (!user || user.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = await generarJWT(user[0].id);

    req.session.token = token;

    // Almacenar el token en una cookie segura
    res.cookie("authToken", token, {
      httpOnly: true, // La cookie no es accesible desde JavaScript
      secure: false, // Cambiar a true en producción con HTTPS
      maxAge: 3600000, // Expiración en milisegundos (1 hora)
    });

    return res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error inesperado" });
  }
};

export const signOutCtrl = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("authToken");
      return res.json({ message: "Cierre de sesión exitoso" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error inesperado" });
  }
};

export const validateSessionCtrl = (req, res) => {
  console.log(req.user);
  return res.json({
    message: "Acceso permitido a área protegida",
    user: req.user,
  });
};
