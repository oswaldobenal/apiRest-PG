import { Country } from "../models/Country.js";
import { City } from "../models/City.js";
import { data } from "../database/countries.js";

export default async () => {
  try {
    data.countries.forEach(async (country) => {
      await Country.findOrCreate({
        where: {
          id: country.iso3,
          name: country.country,
        },
      });
      country.cities.forEach(async city => {
        await City.findOrCreate({
          where: {
            countryId: country.iso3,
            name: city,
          },
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
