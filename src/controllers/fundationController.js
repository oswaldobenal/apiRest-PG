import { User } from "../models/User.js";

export const getFundations = async (req, res) => {
  try {
    const fundation = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      where: {
        role: "fundation",
      },
    });
    return res.send(fundation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
