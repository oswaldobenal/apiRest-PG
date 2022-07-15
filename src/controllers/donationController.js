import { Donations } from '../models/Donations.js';
import { getPaymentByIdService } from '../services/PaymentService.js';

export const createDonation = async (req, res) => {
  try {
    const { data } = req.body;
    const payment = await getPaymentByIdService(data.id);
    if (payment) {
      const { metadata } = payment;
      const newFavouritePet = await Donations.create({
        fromUserId: metadata.from_user.id,
        toUserId: metadata.from_user.id
      })
      return res.status(201).json({ data: newFavouritePet, message: "successfully donated" })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const getDonationsById = async (req, res) => {
  try {
    const { userId } = req.params;
    const donations = await Donations.findAll({
      where: {
        toUserId: userId
      }
    })
    return res.status(200).json(donations);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export const getDonations = async (req, res) => {
  try {
    const donations = await Donations.findAll();
    return res.status(200).json(donations);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

