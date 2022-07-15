import { Pets } from '../../models/Pets.js';
import { User } from '../../models/User.js';
import { TypePet } from '../../models/Typepet.js';
import { BreedPet } from '../../models/Breedpet.js';
import { City } from '../../models/City.js';

export const findAllPets = async () => {
  const pets = await Pets.findAll({
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

  const responsePets = pets.map((pet) => {
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
    return pet
  });
  return responsePets;
}

export const findByPkPets = async (id) => {
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