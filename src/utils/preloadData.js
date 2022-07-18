import { Country } from "../models/Country.js";
import { City } from "../models/City.js";
import { data } from "../database/countries.js";
import { TypePet } from "../models/Typepet.js";
import { BreedPet } from "../models/Breedpet.js";
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
          currency: data.countries[i].currency,
          symbol: data.countries[i].symbol,
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
    for (let i = 0; i < pet.length; i++) {
      await TypePet.findOrCreate({
        where: {
          id: pet[i].type,
          nameType: pet[i].type
        },
      });
      for (let j = 0; j < pet[i].breeds.length; j++) {
        await BreedPet.findOrCreate({
          where: {
            typeId: pet[i].type,
            nameBreed: pet[i].breeds[j],
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
    for (let i = 0; i < pet[0].colors.length; i++) {
      await ColorPet.findOrCreate({
        where: {
          nameColor: pet[0].colors[i],
          typeId: pet[0].type,
        },
      });
    }
    for (let i = 0; i < pet[1].colors.length; i++) {
      await ColorPet.findOrCreate({
        where: {
          nameColor: pet[1].colors[i],
          typeId: pet[1].type,
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
