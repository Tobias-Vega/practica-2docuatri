import { Router } from 'express';
import 
{ signInCtrl,
  validateSessionCtrl,
  signOutCtrl
} from '../controllers/user.controller.js';
import { createUserValidator } from '../validations/user.validators.js';
import { applyValidations } from '../middlewares/validations.js';
import validarJWT from '../middlewares/validarJWT.js';

const userRoutes = Router();

userRoutes.post(
  '/sign-in', 
  createUserValidator, 
  applyValidations, 
  signInCtrl);

userRoutes.get(
  '/session', validarJWT, validateSessionCtrl)

userRoutes.post(
  '/sign-out', signOutCtrl
)

export { userRoutes };