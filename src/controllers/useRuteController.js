import { encrypt, compare } from "../helpers/handleBcrypt.js";
import { City } from "../models/City.js";
import { Country } from "../models/Country.js";
import { Pets } from "../models/Pets.js";
import { User } from "../models/User.js";
import { deleteFile } from "../middlewares/cloudinary.js";
import { Solicitudes } from "../models/Solicitudes.js";

/// POST USER
export const createUser = async (req, res) => {
  const documentfile= req.files.map(d=>d.path);
  const idfiles = req.files.map(d=>d.filename.slice(d.filename.lastIndexOf('/')+1))
  const {
    name,
    lastName,
    password,
    email,
    active,
    verification,
    donaciones,
    countryId,
    cityId,
    address,
    phone,
    role,
  } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user === null) {
      const country = await Country.findByPk(countryId);
      const city = await City.findByPk(cityId);
      //Hash of password.
      const passwordHash = await encrypt(password);
      if(role==="fundation"){
        const usersCountry = await User.create({
        name,
        lastName,
        password: passwordHash,
        email,
        role,
        active:false,
        document:documentfile[0]
      });
      //password set in undefined for security
      usersCountry.set("password", undefined, { strict: false });
      usersCountry.setCountry(country);
      usersCountry.setCity(city);
      Solicitudes.create({
        userId:usersCountry.id
      });
      return res.json({
        message:
          "User Created Successfully!, If you solicited a verification of fundation the state is pending",
      })
      }
      if(role==="admin"){
        const usersCountry = await User.create({
          name,
          lastName,
          password: passwordHash,
          email,
          role,
        });
        //password set in undefined for security
        usersCountry.set("password", undefined, { strict: false });
        usersCountry.setCountry(country);
        usersCountry.setCity(city);
        return res.json({
          message:
            "User Created Successfully!",
        });
      }if(role==="user"){
         const usersCountry = await User.create({
          name,
          lastName,
          password: passwordHash,
          email,
          role,
          active,
        });
        //password set in undefined for security
        usersCountry.set("password", undefined, { strict: false });
        usersCountry.setCountry(country);
        usersCountry.setCity(city);
        return res.json({
          message:
            "User Created Successfully!",
        });
      }
    }
    deleteFile(idfiles);
    return res.status(400).send({ Error: "email already exist!!" });
    // const data = {
    //   token: await tokenSing(usersCountry),
    //   user: usersCountry,
    // };
    // return res.send(data);
  } catch (error) {
    deleteFile[idfiles];
    return res.status(500).json({ message: error.message });
  }
};

/// GET USER
export const getUser = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include:{
        model: Solicitudes,
        attributes:{
          exclude:['updatedAt', 'createdAt']
        }
      }
    });
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
      const user = await User.findByPk(id, { include: Pets },{include: Solicitudes});
      if (user) {
        const pets = await Pets.findAll({ where: { userId: id } });
        const city = await City.findByPk(user.cityId);
        const soli= await Solicitudes.findAll({where:{userId:id}});
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
          solcitudes:soli.map((e)=>e)
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

//UPDATE USER
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;
  const us = await User.findOne({
    where: {
      id,
    },
  });
  try {
    if (password && newPassword) {
      const checkPassword = await compare(password, us.password);
      if (checkPassword) {
        //Hash of password.
        const passwordHash = await encrypt(newPassword);
        await User.update(
          {
            password: passwordHash,
          },
          {
            where: {
              id,
            },
          }
        );

        return res.send({Ok: "Password Updated Successfully!!"});
      } else {
        return res
          .status(401)
          .json({
            error: "Password Incorrect, Please insert your actual password",
          });
      }
    }

    await User.update(req.body, {
      where: {
        id,
      },
    });

    const userUpdated = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    return res.send(userUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

  //PUT USER from admin
export const adminUpdateUser = async (req, res) => {
   const { id } = req.params;
   const {
           name,
           lastName,
           role,
           address,
           phone,
           active,
          } = req.body;
  console.log(req.body);
try {
  await User.update(
       {
           name,
           lastName,
           role,
           address,
           phone,
           active,
       },
       {
        where:{
               id,
             },
      }
        );
        return res.status(201).json({ message: "Updated!" });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

//PUT solicitud from admin
  
export const updatesolicitud = async (req, res) => {
        const { id } = req.params;
        const {
               estado,
               fechafinaliza
            } = req.body;
        try {
          if (id) {
            await Solicitudes.update(
              {
              estado,
              fechafinaliza
              },
              { where: {
                  id,
                },
              }
            );
            return res.status(201).json({ message: "State Updated!" });
          }
      
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

