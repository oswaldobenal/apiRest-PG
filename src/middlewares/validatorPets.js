import { check } from 'express-validator';
import { validatorResultExpress } from './validatorResultExpress.js';
import pets from '../database/pets.js';

export default [
  check('name')
    .trim()
    .notEmpty().withMessage('Pet name can not be empty!'),
  check('coat')
    .isIn(pets[0].coats),
  check('tags')
    .isIn(pets[0].tags),
  check('size')
    .isIn(pets[0].sizes),
  check('age')
    .isIn(pets[0].ages),
  check('health')
    .isIn(pets[0].healths),
  check('description')
    .trim()
    .notEmpty().withMessage('Pet description can not be empty!'),
  validatorResultExpress,
]