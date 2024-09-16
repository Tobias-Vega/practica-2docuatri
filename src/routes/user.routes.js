import { Router } from 'express';
import 
{ allUsersCtrl, 
  createUserCtrl,
  deleteUserCtrl,
  getUserIdCtrl,
  upadteUserCtrl,
} from '../controllers/user.controller.js';
import { createUserValidator, idUserValidator, updateUserValidator } from '../validations/user.validators.js';
import { applyValidations } from '../middlewares/validations.js';

const userRoutes = Router();

userRoutes.get(
  '/', 
  allUsersCtrl);

userRoutes.post(
  '/', 
  createUserValidator, 
  applyValidations, 
  createUserCtrl);

userRoutes.get(
  '/:id', 
  idUserValidator, 
  applyValidations, 
  getUserIdCtrl);

userRoutes.patch(
  '/:id', 
  updateUserValidator,
  idUserValidator,
  applyValidations, 
  upadteUserCtrl);

userRoutes.delete(
  '/:id',
  idUserValidator,
  applyValidations,
  deleteUserCtrl);

export { userRoutes };