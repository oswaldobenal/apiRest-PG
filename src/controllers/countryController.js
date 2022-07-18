import { Country } from "../models/Country.js";
import { data } from "../database/countries.js";

//This controller looks for the countries in the database and if they don't exist, it creates them
export const getCountries = async (req, res) => {
  try {
    const countries = data.countries.map((country) => {
      return {
        id: country.iso3,
        name: country.country,
        currency: country.currency,
        symbol: country.symbol,
      };
    });
    countries.forEach((country) => {
      Country.findOrCreate({
        where: {
          id: country.id,
          name: country.name,
          currency: country.currency,
          symbol: country.symbol,
        },
      });
    });
    return res.json(countries);
  } catch (error) {
    return res.status(500).json({ messageE: error.message });
  }
};
