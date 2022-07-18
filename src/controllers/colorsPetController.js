import { ColorPet } from '../models/Colorpet.js';

export const getColorPets = async (req, res) => {
  const colorPets = await ColorPet.findAll();
  return res.status(200).json(colorPets);
}

export const getColorsPetsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const colorPets = await ColorPet.findAll({
      where: {
        typeId: type
      }
    });
    return res.status(200).json(colorPets);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const createColorPets = (req, res) => {
  return res.send('create color Pets');
}