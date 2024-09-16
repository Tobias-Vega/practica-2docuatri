import express from 'express';
import { PORT } from './src/settings/environments.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { userRoutes } from './src/routes/user.routes.js';

const app = express();


// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
