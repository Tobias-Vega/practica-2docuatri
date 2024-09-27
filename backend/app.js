import express from 'express';
import { PORT } from './src/settings/environments.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { userRoutes } from './src/routes/user.routes.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { todosRoutes } from './src/routes/todo.routes.js';

const app = express();


// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(session({
    secret: 'tu_secreto_aqui', // Cambia esto por una cadena segura
    resave: false, // Evita que se guarde la sesión si no hay cambios
    saveUninitialized: false, // No guarda sesiones vacías
    cookie: {
      maxAge: 3600000, // 1 hora
      secure: false, // Debe ser `true` si estás en producción con HTTPS
    }
  }));
app.use('/', userRoutes)
app.use('/', todosRoutes)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
