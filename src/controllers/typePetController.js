import { TypePet } from '../models/Typepet.js';

export const getTypesPets = async (req, res) => {
  try {
    const typesPets = await TypePet.findAll();
    return res.status(200).json(typesPets);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

}

export const createTypesPets = (req, res) => {
  return res.send('create Types Pets');
}