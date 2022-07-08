//Models
import { City } from "../models/City.js";
import { Country } from "../models/Country.js";
//Import Countries Data
import { data } from "../database/countries.js";

//Get data where external file.
const citiesByCountry = () => {
  const cities = data.countries.map((el) => {
    return {
      countryId: el.iso3,
      cities: el.cities.map((city) => city),
    };
  });
  cities.forEach((el) => {
    if (el.countryId === "ARG") {
      el.cities.forEach((city) => {
        City.create({
          name: city,
          countryId: el.countryId,
        });
      });
    }
    if (el.countryId === "CHL") {
      el.cities.forEach((city) => {
        City.create({
          name: city,
          countryId: el.countryId,
        });
      });
    }
    if (el.countryId === "COL") {
      el.cities.forEach((city) => {
        City.create({
          name: city,
          countryId: el.countryId,
        });
      });
    }
    if (el.countryId === "ECU") {
      el.cities.forEach((city) => {
        City.create({
          name: city,
          countryId: el.countryId,
        });
      });
    }
    if (el.countryId === "PER") {
      el.cities.forEach((city) => {
        City.create({
          name: city,
          countryId: el.countryId,
        });
      });
    }
  });
};

export const createCities = async (req, res) => {
  citiesByCountry();
  try {
    return res.json({ message: "Cities save in database" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCitiesById = async (req, res) => {
  try {
    const { idCountry } = req.params;
    const country = await Country.findByPk(idCountry);
    if (country) {
      const cities = await City.findAll({
        where: {
          countryId: idCountry,
        },
      });
      return res.json(cities);
    }
    return res.json({ error: "Cities not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
