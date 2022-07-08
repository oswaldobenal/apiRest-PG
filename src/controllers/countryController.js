import { Country } from "../models/Country.js";
import { data } from "../database/countries.js";

//This controller looks for the countries in the database and if they don't exist, it creates them
export const getCountries = async (req, res) => {
  try {
    const countries = data.countries.map((el) => {
      return {
        id: el.iso3,
        name: el.country,
      };
    });
    countries.forEach((country) => {
      Country.findOrCreate({
        where: {
          id: country.id,
          name: country.name,
        },
      });
    });
    res.json(countries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

