import { BreedPet } from '../models/Breedpet.js';

export const getBreedPets = async (req, res) => {
  const breedPets = await BreedPet.findAll();
  return res.status(200).json(breedPets);
}

export const getBreedPetsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const breedPets = await BreedPet.findAll({
      where: {
        typeId: type
      }
    });
    return res.status(200).json(breedPets);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const createBreedPets = (req, res) => {
  return res.send('create Breed Pets');
}