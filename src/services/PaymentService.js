import axios from 'axios';
import "dotenv/config";

const {
  ACCESS_TOKEN,
} = process.env;

export const newPreferentialPaymentService = async (dataBody) => {

  const url = "https://api.mercadopago.com/checkout/preferences";

  const {
    items,
    payer,
    metadata
  } = dataBody;

  const body = {
    items,
    payer,
    /*     items: [
          {
            id: 20,
            title: "Donación para fundacion",
            currency_id: "PEN",
            picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
            description: "Donación a una mascota",
            category_id: "donations",
            quantity: 1,
            unit_price: 10
          }
        ],
        payer: {
          name: "Juan",
          surname: "Lopez",
          email: "test_user_83636644@testuser.com",
          phone: {
            area_code: "11",
            number: "4444-4444"
          },
          identification: {
            type: "DNI",
            number: "12345678"
          },
          address: {
            street_name: "Street",
            street_number: 123,
            zip_code: "5700"
          }
        }, */
    auto_return: "approved",
    back_urls: {
      // success: "http://localhost:5000/api/v1.0/donations/success",
      success: "https://api-rest-adoptame.up.railway.app/api/v1.0/donations/success",
      failure: "http://www.failure.com",
      pending: "http://www.pending.com"
    },
    metadata,
    // notification_url: "https://api-rest-adoptame.up.railway.app/api/v1.0/pets/notif?source_news=webhooks",
    notification_url: "https://api-rest-adoptame.up.railway.app/api/v1.0/donations?source_news=webhooks"
    /*     metadata: {
          fromUser: {
            country: "PER"
            id: 1,
            typeUser: "User"
          },
          toUser: {
            country: "PER"
            id: 1,
            typeUser: "User"
          }
        } */
  }
  const { data } = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });

  return data.init_point;
}

export const getPaymentByIdService = async (idPaymet) => {

  const url = `https://api.mercadopago.com/v1/payments/${idPaymet}`;

  const payments = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });

  return payments.data;
}
