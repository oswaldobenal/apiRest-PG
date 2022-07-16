import { Router } from "express";
import { getDonations, createDonation, getDonationsById } from "../controllers/donationController.js";
import {
  createPreferentialPayment,
  getPaymentById
} from "../controllers/mercadoPagoController.js";

const router = Router();

/* router.get("/success", (req, res) => {
  console.log(req.query);
  return res.send(req.query)
});
 */
router.post("/urlPreferential", createPreferentialPayment);
router.get("/mercadopago/:idPayment", getPaymentById);

router.post("/", createDonation);
router.get("/", getDonations);
router.get("/:userId", getDonationsById);

export default router;
