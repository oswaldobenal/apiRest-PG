import { Pets } from '../../models/Pets.js';
import { User } from '../../models/User.js';
import { TypePet } from '../../models/Typepet.js';
import { BreedPet } from '../../models/Breedpet.js';
import { City } from '../../models/City.js';
import { Country } from '../../models/Country.js';
import { ColorPet } from '../../models/Colorpet.js';

export const findAllPets = async () => {
  const pets = await Pets.findAll({
    attributes: { exclude: ['breedId', 'typeId'] },
    include: [
      {
        model: ColorPet,
        attributes: ['nameColor'],
      },
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
        // attributes: ['address'],
        include: [
          {
            model: Country,
          },
          {
            model: City,
            // attributes: ['name'],
          }
        ]
      }
    ],
    raw: true,
  });

  const responsePets = pets.map((pet) => {
    pet.environment = JSON.parse(pet.environment)
    pet.attributes = JSON.parse(pet.attributes)
    pet.photos = pet.photos.map((photo) => {
      return {
        option_1: photo,
        option_2: photo,
        option_3: photo,
      }
    })

    pet['type'] = pet["typepet.nameType"];
    pet['breed'] = pet["breedpet.nameBreed"];
    pet['color'] = pet["colorpet.nameColor"];
    let date = new Date(pet["published_at"]);
    pet.status_changed_at = Number(date); // EPOCH format
    pet.contact = {
      email: pet["user.email"],
      phone: pet["user.phone"],
      address: {
        address: pet["user.address"],
        city: pet["user.city.name"],
        state: pet["user.state.name"] || null,
        postcode: pet["user.city.postcode"] || null,
        country: pet["user.countryId"]
      }
    }

    delete pet["user.id"];
    delete pet["user.name"];
    delete pet["user.email"];
    delete pet["user.phone"];
    delete pet["user.lastName"];
    delete pet["user.password"];
    delete pet["user.address"];
    delete pet["user.cityId"];
    delete pet["user.city.name"];
    delete pet["user.city.id"];
    delete pet["user.city.countryId"];

    delete pet["user.country.id"];
    delete pet["user.country.name"];
    delete pet["user.country.currency"];
    delete pet["user.country.symbol"];

    delete pet["user.countryId"];
    delete pet["user.role"];
    delete pet["user.active"];
    delete pet["user.verification"];
    delete pet["user.donaciones"];
    delete pet["user.document"];

    delete pet["colorpet.nameColor"];
    delete pet["typepet.nameType"];
    delete pet["breedpet.nameBreed"];
    delete pet["colorId"];

    return pet
  });
  return responsePets;
}

export const findByPkPets = async (id) => {
  const pet = await Pets.findByPk(id, {
    attributes: { exclude: ['breedId', 'typeId'] },
    include: [
      {
        model: ColorPet,
        attributes: ['nameColor'],
      },
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
        include: [
          {
            model: Country,
          },
          {
            model: City,
          }
        ]
      }
    ],
    raw: true,
  });
  pet.environment = JSON.parse(pet.environment)
  pet.attributes = JSON.parse(pet.attributes)
  pet.photos = pet.photos.map((photo) => {
    return {
      option_1: photo,
      option_2: photo,
      option_3: photo,
    }
  })

  pet['type'] = pet["typepet.nameType"];
  pet['breed'] = pet["breedpet.nameBreed"];
  pet['color'] = pet["colorpet.nameColor"];
  let date = new Date(pet["published_at"]);
  pet.status_changed_at = Number(date); // EPOCH format
  pet.contact = {
    email: pet["user.email"],
    phone: pet["user.phone"],
    address: {
      address: pet["user.address"],
      city: pet["user.city.name"],
      state: pet["user.state.name"] || null,
      postcode: pet["user.city.postcode"] || null,
      country: pet["user.countryId"]
    }
  }

  delete pet["user.id"];
  delete pet["user.name"];
  delete pet["user.email"];
  delete pet["user.phone"];
  delete pet["user.lastName"];
  delete pet["user.password"];
  delete pet["user.address"];
  delete pet["user.cityId"];
  delete pet["user.city.name"];
  delete pet["user.city.id"];
  delete pet["user.city.countryId"];

  delete pet["user.country.id"];
  delete pet["user.country.name"];
  delete pet["user.country.currency"];
  delete pet["user.country.symbol"];

  delete pet["user.countryId"];
  delete pet["user.role"];
  delete pet["user.active"];
  delete pet["user.verification"];
  delete pet["user.donaciones"];
  delete pet["user.document"];

  delete pet["colorpet.nameColor"];
  delete pet["typepet.nameType"];
  delete pet["breedpet.nameBreed"];
  delete pet["colorId"];

  return pet
}