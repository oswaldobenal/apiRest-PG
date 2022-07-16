import { Router } from 'express';
import { generateDataPets } from '../helpers/generateData.js';
import { User } from '../models/User.js';
import { Pets } from '../models/Pets.js';
const router = Router();

router.get('/:results', async (req, res) => {
  try {
    const { results } = req.params;
    if (results) {
      let responseIds = await User.findAll({
        attributes: ['id'],
        raw: true
      });
      const ids = responseIds.map(user => user.id);
      await Pets.bulkCreate(await generateDataPets(results, ids));
      return res.status(200).json({ message: `${results} mascotas agregadas` });
    }
    return res.status(400).json({ message: `${results} se requiere /{numero de mascotas crear}` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

export default router;
