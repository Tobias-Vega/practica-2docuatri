import { body, param } from 'express-validator';

export const createUserValidator = [
  body('username')
    .isString()
    .withMessage('El nombre de usuario debe ser un string')
    .notEmpty()
    .withMessage('El nombre de usuario no debe estar vacío'),
  body('password')
    .isString()
    .withMessage('la contraseña debe ser un string')
    .notEmpty()
    .withMessage('La contraseña no debe estar vacía')
    .isStrongPassword({
      minLength: 6,
      minLowercase:1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,

    })
    .withMessage('Tu constraseña es muy débil')
];

export const updateUserValidator = [
  body('username')
    .isString()
    .withMessage('El nombre de usuario debe ser un string')
    .notEmpty()
    .withMessage('El nombre de usuario no debe estar vacío'),
  body('email')
    .isString()
    .withMessage('El email debe ser un string')
    .notEmpty()
    .withMessage('El email no debe estar vacío')
    .isEmail()
    .withMessage('El email debe ser válido'),
  body('password')
    .isString()
    .withMessage('la contraseña debe ser un string')
    .notEmpty()
    .withMessage('La contraseña no debe estar vacía')
    .isStrongPassword({
      minLength: 6,
      minLowercase:1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,

    })
    .withMessage('Tu constraseña es muy débil')
];

export const idUserValidator = [
  param('id')
    .isInt()
    .withMessage('El id del usuario debe ser un número entero.')
];