import { Donations } from '../models/Donations.js';
import { getPaymentByIdService } from '../services/PaymentService.js';

export const createDonation = async (req, res) => {
  try {
    const { data } = req.body;
    console.log('req.body', req.body);
    console.log('req.query', req.query);
    const payment = await getPaymentByIdService(data.id);
    console.log('data.id: ', data.id);
    console.log('payment: ', payment);
    if (payment) {
      const { metadata } = payment;
      const newFavouritePet = await Donations.create({
        fromUserId: metadata.from_user.id,
        toUserId: metadata.to_user.id
      })
      return res.status(201).json({ data: newFavouritePet, message: "successfully donated" })
    }
    return res.status(200).json({ data: req.body });
  } catch (error) {
    console.log(error);
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

