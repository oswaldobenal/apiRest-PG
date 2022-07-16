import { Country } from "../models/Country.js";
import { City } from "../models/City.js";
import { data } from "../database/countries.js";
import { TypePet } from "../models/Typepet.js";
import { BreedPet } from "../models/Breedpet.js";
import { typesPets } from "../database/typePets.js";
import { organizations } from "../database/fundations.js";
import { User } from "../models/User.js";
import { encrypt, compare } from "../helpers/handleBcrypt.js";

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

export const preloadFundations= async()=>{
  const password= "Test1@";
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
