import { Country } from "../models/Country.js";
import { City } from "../models/City.js";
import { data } from "../database/countries.js";
import { TypePet } from "../models/Typepet.js";
import { BreedPet } from "../models/Breedpet.js";
import { typesPets } from "../database/typePets.js";
import { ColorPet } from "../models/Colorpet.js";
import { Pets } from "../models/Pets.js";
import { User } from '../models/User.js';
import pet from "../database/pets.js";
import { generateDataPets } from '../helpers/generateData.js';
import { organizations } from "../database/fundations.js";
import { encrypt, compare } from "../helpers/handleBcrypt.js";
import { users } from "../database/precargaUsers.js";


export const preloadCountrys = async () => {
  try {
    for (let i = 0; i < data.countries.length; i++) {
      await Country.findOrCreate({
        where: {
          id: data.countries[i].iso3,
          name: data.countries[i].country,
        },
      });
      for (let j = 0; j < data.countries[i].cities.length; j++) {
        await City.findOrCreate({
          where: {
            countryId: data.countries[i].iso3,
            name: data.countries[i].cities[j],
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const preloadTypesPets = async () => {
  try {
    for (let i = 0; i < typesPets.length; i++) {
      await TypePet.findOrCreate({
        where: {
          id: typesPets[i].type,
          nameType: typesPets[i].type
        },
      });
      for (let j = 0; j < typesPets[i].breeds.length; j++) {
        await BreedPet.findOrCreate({
          where: {
            typeId: typesPets[i].type,
            nameBreed: typesPets[i].breeds[j],
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const preloadColorsPets = async () => {
  try {
    for (let i = 0; i < pet.cat.colors.length; i++) {
      await ColorPet.findOrCreate({
        where: {
          nameColor: pet.cat.colors[i],
          typeId: pet.cat.type,
        },
      });
    }
    for (let i = 0; i < pet.dog.colors.length; i++) {
      await ColorPet.findOrCreate({
        where: {
          nameColor: pet.dog.colors[i],
          typeId: pet.dog.type,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const preloadPets = async (results) => {
  try {
    let responseIds = await User.findAll({
      attributes: ['id'],
      raw: true
    });
    const ids = responseIds.map(user => user.id);
    await Pets.bulkCreate(await generateDataPets(results, ids));
  } catch (error) {
    console.log(error);
  }
};

export const preloadFundations= async()=>{
  const password= "Test18@@";
  const passwordHash = await encrypt(password);
  try {
    for (let i = 0; i < organizations.length; i++) {
      
      await User.findOrCreate({
        where:{
          name:organizations[i].name,
          lastName:"apellido",
          email:organizations[i].email,
          password:passwordHash,
          address:organizations[i].address.address1,
          phone:"111111",
          role:"fundation",
          countryId:organizations[i].address.country,
          cityId:organizations[i].address.city  
        }
      })
      

    }
    
  } catch (error) {
    console.log(error)
  }
}
export const preloadUser= async()=>{
  const password= "Test18@@";
  const passwordHash = await encrypt(password);
  try {
    for (let i = 0; i < users.length; i++) {
      
      await User.findOrCreate({
        where:{
          name:users[i].name,
          lastName:users[i].lastName,
          email:users[i].email,
          password:passwordHash,
          address:users[i].address,
          phone:users[i].phone,
          role:users[i].role,
          countryId:users[i].countryId,
          cityId:users[i].cityId  
         }
      })
  
    }
    
  } catch (error) {
    console.log(error)
  }
}
