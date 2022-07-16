import { Donations } from '../models/Donations.js';
import { getPaymentByIdService } from '../services/PaymentService.js';

export const createDonation = async (req, res) => {
  try {
    const { data } = req.body;
    const payment = await getPaymentByIdService(data.id);
    if (payment) {
      const {
        metadata,
        status,
        status_detail,
        fee_details,
        transaction_details
      } = payment;

      if (status === 'approved' && status_detail === 'accredited') {
        console.log('metadata: ', metadata);
        console.log('status: ', status);
        console.log('status_detail: ', status_detail);
        console.log('fee_details: ', fee_details);
        console.log('transaction_details: ', transaction_details);
        const newFavouritePet = await Donations.create({
          fromUserId: metadata.from_user.id,
          toUserId: metadata.to_user.id,
          status,
          status_detail,
          comision_amount: fee_details[0].amount,
          acredit_amount: transaction_details.net_received_amount,
          total_amount: transaction_details.total_paid_amount,
        })
        return res.status(201).json({ data: newFavouritePet, message: "successfully donated" })
      }
    }
    return res.status(4700).json({ data: req.body });
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

