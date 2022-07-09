import { User } from "../models/User.js";
import { compare } from "../helpers/handleBcrypt.js";
import { tokenSing } from "../helpers/handleJwt.js";

/**
 * Este controlador es para loguear a los usuarios.
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "name", "lastName", "email", "role", "password"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashPassword = user.password;
    const checkPassword = await compare(password, hashPassword);

    if (!checkPassword) {
      return res.status(401).send({ Error: "Password Incorrect" });
    }

    user.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSing(user),
      user,
    };
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
