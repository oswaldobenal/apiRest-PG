import { encrypt, compare } from "../helpers/handleBcrypt.js";
import { City } from "../models/City.js";
import { Country } from "../models/Country.js";
import { Pets } from "../models/Pets.js";
import { User } from "../models/User.js";

/// POST USER
export const createUser = async (req, res) => {
  const {
    name,
    lastName,
    password,
    email,
    active,
    donaciones,
    countryId,
    cityId,
    address,
    phone,
    document,
  } = req.body;
  const country = await Country.findByPk(countryId);
  const city = await City.findByPk(cityId);
  console.log(country);
  console.log(city);
  try {
    //Hash of password.
    const passwordHash = await encrypt(password);
    console.log(passwordHash);
    const usersCountry = await User.create({
      name,
      lastName,
      password: passwordHash,
      email,
      address,
      phone,
    });
    //password set in undefined for security
    usersCountry.set("password", undefined, { strict: false });

    usersCountry.setCountry(country);
    usersCountry.setCity(city);
    return res.json({
      message:
        "User Created Successfully!, If you solicited a verification of fundation the state is pending",
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

/// GET USER
export const getUser = async (req, res) => {
  try {
    let users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.json(error);
  }
};

/// GET DETAILS USER
export const getDetailUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const user = await User.findByPk(id, { include: Pets });
      if (user) {
        const pets = await Pets.findAll({ where: { userId: id } });
        const city = await City.findByPk(user.cityId);

        const dataUser = {
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          donaciones: user.donaciones,
          country: user.countryId,
          city: city.name,
          address: user.address,
          phone: user.phone,
          active: user.active,
          document: user.document,
          pets: pets.map((e) => e),
        };

        return res.send(dataUser);
      } else {
        return res.status(400).json({ error: "User Not Found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//PUT USER
export const putUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, password, role, address, phone, active, donaciones } =
    req.body;
  try {
    //Hash of password update.
    const passwordHash = await encrypt(password);

    await User.update(
      {
        name,
        lastName,
        password: passwordHash,
        role,
        address,
        phone,
        active,
        donaciones,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(201).json({ message: "Updated!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
