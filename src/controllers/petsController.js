import { Pets } from '../models/Pets.js';
import { User } from '../models/User.js';
import { deleteFile } from '../middlewares/cloudinary.js';

export const getPets = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.query;

    if (id) {
      const pet = await Pets.findByPk(id);
      return res.status(200).json(pet);
    }

    if (name === '') {
      const pets = await Pets.findAll();
      return res.status(200).json(pets);
    }

    if (name) {
      const pets = await Pets.findAll();
      const petByName = pets.filter(pet => pet.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
      return res.status(200).json(petByName);
    }

    const pets = await Pets.findAll();
    return res.status(200).json(pets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const createPets = async (req, res) => {
  const image = req.file.path;
  const idFile = req.file.filename.slice(req.file.filename.lastIndexOf('/') + 1);
  try {
    const {
      name,
      race,
      sexo,
      city,
      size,
      color,
      health,
      description,
      userId
    } = req.body;

    const user = await User.findByPk(userId);

    if (user) {
      const newPet = await Pets.create({
        name,
        race,
        sexo,
        city,
        size,
        color,
        health,
        description,
        image
      });
      await newPet.setUser(user.id);
      return res.status(201).json(newPet);
    }
    await deleteFile(idFile);
    return res.status(400).json({ message: "user invalid" });

  } catch (error) {
    await deleteFile(idFile);
    return res.status(400).json({ message: error.message });
  }
}

export const updatePets = async (req, res) => {
  const newImage = req.file?.path;
  const idFile = req.file?.filename.slice(req.file?.filename.lastIndexOf('/') + 1);
  try {
    const { id } = req.params;
    const {
      name,
      race,
      sexo,
      city,
      size,
      color,
      health,
      description,
      image,
      userId
    } = req.body;

    const pet = await Pets.findByPk(id);
    const user = await User.findByPk(userId);

    if (pet && user) {

      const nameFile = pet.image.slice(pet.image.lastIndexOf('/') + 1);
      const oldIdFile = nameFile.slice(0, nameFile.indexOf('.'));

      newImage && await deleteFile(oldIdFile);
      await Pets.update({
        name,
        race,
        sexo,
        city,
        size,
        color,
        health,
        description,
        image: !image ? newImage : image,
      }, {
        where: {
          id
        }
      });
      pet.setUser(user.id);
      return res.status(201).json({ message: 'Updated!' });
    }
    newImage && await deleteFile(idFile);
    return res.status(400).json({ message: "pet invalid" });

  } catch (error) {
    newImage && await deleteFile(idFile);
    return res.status(400).json({ message: error.message });
  }

}

export const deletePets = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pets.findByPk(id);
    if (pet) {
      const nameFile = pet.image.slice(pet.image.lastIndexOf('/') + 1);
      const oldIdFile = nameFile.slice(0, nameFile.indexOf('.'));
      await deleteFile(oldIdFile);
      const deleted = await Pets.destroy({
        where: {
          id
        }
      })
      return deleted
        ? res.status(200).json({ message: "successfully removed" })
        : res.status(200).json({ message: "error deleting" });
    }
    return res.status(400).json({ message: "pet invalid" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
