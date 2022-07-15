import axios from "axios";


export const moneyCountry = async () => {
  const info = await axios.get("https://api.mercadopago.com/currencies/");
  const moneyData = info.data.map((el) => {
    return {
      id: el.id,
      description: el.description,
      decimal: el.decimal_places,
    };
  });
  return moneyData;
};
