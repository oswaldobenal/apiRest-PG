import { UserPetsFavourite } from '../models/FavouritePet.js';
import { User } from '../models/User.js';
import { Pets } from '../models/Pets.js';
import { TypePet } from '../models/Typepet.js';
import { BreedPet } from '../models/Breedpet.js';
import { City } from '../models/City.js';

const findByPkPets = async (id) => {
  const pet = await Pets.findByPk(id, {
    attributes: { exclude: ['breedId', 'typeId'] },
    include: [
      {
        model: TypePet,
        attributes: ['nameType'],
      },
      {
        model: BreedPet,
        attributes: ['nameBreed'],
      },
      {
        model: User,
        attributes: ['address'],
        include: [
          {
            model: City,
            attributes: ['name'],
          }
        ]
      }
    ],
    raw: true,
  });
  pet.environment = JSON.parse(pet.environment)
  pet['type'] = pet["typepet.nameType"];
  pet['breed'] = pet["breedpet.nameBreed"];
  pet['city'] = pet["user.city.name"];
  pet['address'] = pet["user.address"];
  delete pet["typepet.nameType"];
  delete pet['breedpet.nameBreed'];
  delete pet["user.city.id"];
  delete pet["user.city.name"];
  delete pet['user.address'];
  return pet;
}

export const getFavouritePetsByUser = async (req, res) => {
  // #swagger.tags = ['PETS/FAVOURITE']
  try {
    const { userId } = req.params;
    if (userId) {
      const petsFavorites = await UserPetsFavourite.findAll({
        where: {
          userId
        }
      });
      const detailPet = petsFavorites.map(userPet => findByPkPets(userPet.petId));
      const favoritePetsUser = await Promise.all(detailPet);
      return res.status(200).json(favoritePetsUser)
    }
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