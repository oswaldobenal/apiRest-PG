import { check } from 'express-validator';
import { validatorResultExpress } from './validatorResultExpress.js';

export default [
  check('name')
    .trim()
    .notEmpty().withMessage('Pet name can not be empty!'),
  check('typeHair')
    .isIn(['hairless', 'short', 'medium', 'long', 'wire', 'kinky']),
  check('tags')
    .isIn(['friendly', 'affectionate', 'protective', 'smart', 'funny', 'quiet']),
  check('size')
    .isIn(['small', 'medium', 'large', 'extra large']),
  check('color')
    .trim()
    .notEmpty().withMessage('Pet color can not be empty!'),
  check('age')
    .isIn(['puppy', 'young', 'adult', 'senior']),
  check('health')
    .isIn(['vaccinations up to date', 'no vaccines']),
  check('description')
    .trim()
    .notEmpty().withMessage('Pet description can not be empty!'),
  validatorResultExpress,
]