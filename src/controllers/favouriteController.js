import { UserPetsFavourite } from '../models/FavouritePet.js';
import { findAllPets, findByPkPets } from '../models/Views/pets.views.js';

export const favouritePetsByUser = async (userId) => {
  try {
    if (userId) {
      const petsFavorites = await UserPetsFavourite.findAll({
        where: {
          userId
        }
      });
      const detailPet = petsFavorites.map(userPet => findByPkPets(userPet.petId));
      const favoritePetsUser = await Promise.all(detailPet);
      return favoritePetsUser
    }
  } catch (error) {
    console.log(error);
    return []
  }
}

export const getFavouritePetsByUser = async (req, res) => {
  // #swagger.tags = ['PETS/FAVOURITE']
  try {
    const { userId } = req.params;
    const myFavouritePets = await favouritePetsByUser(userId);
    return res.status(200).json(myFavouritePets)
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const getFavouritePets = async (req, res) => {
  // #swagger.tags = ['PETS/FAVOURITE']
  try {
    const allPetsFavorites = await UserPetsFavourite.findAll();
    const allDetailPets = allPetsFavorites.map(userPet => findByPkPets(userPet.petId));
    const allFavoritePets = await Promise.all(allDetailPets);
    return res.status(200).json(allFavoritePets)
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const createFavouritePet = async (req, res) => {
  // #swagger.tags = ['PETS/FAVOURITE']
  try {
    const { userId, petId } = req.body;

    const newFavouritePet = await UserPetsFavourite.create({
      petId,
      userId
    })
    return res.status(201).json({ data: newFavouritePet, message: 'add to favorites successfully' })
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const deleteFafouritePet = async (req, res) => {
  // #swagger.tags = ['PETS/FAVOURITE']
  try {
    const { userId, petId } = req.query;
    const responseDeleted = await UserPetsFavourite.destroy({
      where: { userId, petId }
    })
    if (responseDeleted) {
      return res.status(201).json({ message: 'successfully removed from favorites' })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}