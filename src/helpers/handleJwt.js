import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

/**
 * Debes pasar el objeto del usuario
 * @param {*} user
 */

export const tokenSing = async (user) => {
  const sing = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return sing;
};

/**
 * Debes pasar el token de sesion JWT
 * @param {*} tokenJwt
 * @returns
 */

export const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt);
  } catch (error) {
    return null;
  }
};
