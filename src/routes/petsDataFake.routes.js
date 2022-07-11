import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { typesPets } from '../database/typePets.js';
import axios from 'axios';

const router = Router();

router.get('/:results', async (req, res) => {
  let data = [];

  const createRandomUser = async () => {
    let type = faker.helpers.arrayElement(['cat', 'dog']);
    /*     let responseBreeds = await axios.get('https://api-rest-adoptame.herokuapp.com/api/v1.0/breed-pet');
        let breedsCats = responseBreeds.data.filter(cat => cat.typeId === 'cat');
        let nameBreedCats = breedsCats.map(nameBreedCat => nameBreedCat.name);
    
        let breedsDogs = responseBreeds.data.filter(cat => cat.typeId === 'dog');
        let nameBreedDogs = breedsDogs.map(nameBreedDog => nameBreedDog.name); */

    let nameBreedCats = typesPets[0].breeds.map(nameBreedCat => nameBreedCat);

    let nameBreedDogs = typesPets[1].breeds.map(nameBreedDog => nameBreedDog);

    let date = faker.date.recent(10, Date.now());
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    let published_at = year + '-' + month + '-' + dt;

    let resultPhotos = faker.datatype.number({ min: 1, max: 5 });
    let photosCats = [];
    for (let index = 0; index < resultPhotos; index++) {
      photosCats.push(faker.image.cats());
    }

    let photosDogs = [];
    for (let index = 0; index < resultPhotos; index++) {
      let { data } = await axios.get('https://dog.ceo/api/breeds/image/random');
      let urlImageDog = await data.message;
      photosDogs.push(urlImageDog);
    }

    return {
      id: faker.datatype.number(),
      type: type,
      name: faker.name.firstName(),
      typeHair: faker.helpers.arrayElement(['hairless', 'short', 'medium', 'long', 'wire', 'kinky']),
      specialCares: faker.helpers.arrayElement([true, false]),
      castrated: faker.helpers.arrayElement([true, false]),
      gender: faker.helpers.arrayElement(['male', 'female']),
      environment: faker.helpers.arrayElement([{
        children: faker.helpers.arrayElement([true, false, null]),
        dogs: faker.helpers.arrayElement([true, false, null]),
        cats: faker.helpers.arrayElement([true, false, null]),
      }]),
      tags: faker.helpers.arrayElements(['friendly', 'affectionate', 'protective', 'smart', 'funny', 'quiet'], faker.datatype.number({ min: 1, max: 6 })),

      size: faker.helpers.arrayElement(['small', 'medium', 'large', 'extra large']),
      color: faker.helpers.arrayElement([
        'Calypso',
        'Checkers',
        'Dot',
        'Dotty',
        'Freckles',
        'Harlequin',
        'Jester',
        'Mash',
        'Oreo',
        'Patches',
        'Pockets',
        'Rainbow',
        'Sargent',
        'Scraps',
        'Sherbet',
        'Skittles',
        'Spot',
        'Sprinkles',
        'Spumoni',
        'Tiger',
        'Tigger',
        'Tigra',
        'Tuxedo',
        'Tyghe'
      ]),
      age: faker.helpers.arrayElement(['puppy', 'young', 'adult', 'senior']),
      published_at: published_at,
      health: faker.helpers.arrayElement(['vaccinations up to date', 'no vaccines']),
      description: faker.lorem.paragraphs(),
      photos: faker.helpers.arrayElements([type === 'cat' ? photosCats : photosDogs], resultPhotos),
      status: faker.helpers.arrayElement(['adoptable', 'adopted']),
      userId: faker.datatype.number({ min: 1, max: 10 }),
      breed: faker.helpers.arrayElement(type === 'cat' ? nameBreedCats : nameBreedDogs),
      city: faker.address.cityName(),
      address: faker.address.streetAddress()
    };
  }

  const { results } = req.params;

  for (let i = 0; i < results; i++) {
    data.push(await createRandomUser());
  }

  return res.status(200).json(data);
});

export default router;
