import { check } from 'express-validator';
import { validatorResultExpress } from './validatorResultExpress.js';
import pets from '../database/pets.js';

export default [
  check('name')
    .trim()
    .notEmpty().withMessage('Pet name can not be empty!'),
  check('coat')
    .isIn(pets.coats),
  check('tags')
    .isIn(pets.tags),
  check('size')
    .isIn(pets.sizes),
  check('color')
    .trim()
    .notEmpty().withMessage('Pet color can not be empty!'),
  check('age')
    .isIn(pets.ages),
  check('health')
    .isIn(pets.healths),
  check('description')
    .trim()
    .notEmpty().withMessage('Pet description can not be empty!'),
  validatorResultExpress,
]