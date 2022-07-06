import axios from "axios";
import { Country } from "../models/Country.js";
import { City } from "../models/City.js";

//Get countries data where external API
const getApiInfo = async () => {
  const info = await axios.get("https://countriesnow.space/api/v0.1/countries");
  const countries = info.data.data.map((el) => el);
  return countries;
};

//Filter the total countries to obtain only six countries.
const filterCountries = async () => {
  const ctFiltered = [];
  const infoApi = await getApiInfo();
  infoApi.forEach((name) => {
    if (name.country === "Argentina") {
      ctFiltered.push(name.country);
    }
    if (name.country === "Chile") {
      ctFiltered.push(name.country);
    }
    if (name.country === "Colombia") {
      ctFiltered.push(name.country);
    }
    if (name.country === "Ecuador") {
      ctFiltered.push(name.country);
    }
    if (name.country === "Peru") {
      ctFiltered.push(name.country);
    }
    if (name.country === "Venezuela") {
      ctFiltered.push(name.country);
    }
  });
  return ctFiltered;
};

//This controller looks for the countries in the database and if they don't exist, it creates them
export const getCountries = async (req, res) => {
  try {
    const ct = await filterCountries();
    ct.forEach((country) => {
      Country.findOrCreate({
        where: {
          name: country,
        },
      });
    });
    return res.json(ct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
