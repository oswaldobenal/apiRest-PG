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
      const pets = await Pets.findAll({
        raw: true,
      });

      const allPets = pets.map((pet) => {
        pet.breed = JSON.parse(pet.breed)
        pet.environment = JSON.parse(pet.environment)
        return pet
      });
      return res.status(200).json(allPets);
    }

    if (name) {
      const pets = await Pets.findAll({
        raw: true,
      });

      const allPets = pets.map((pet) => {
        pet.breed = JSON.parse(pet.breed)
        pet.environment = JSON.parse(pet.environment)
        return pet
      });
      const petByName = allPets.filter(pet => pet.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
      return res.status(200).json(petByName);
    }
    const pets = await Pets.findAll({
      raw: true,
    });

    const allPets = pets.map((pet) => {
      pet.breed = JSON.parse(pet.breed)
      pet.environment = JSON.parse(pet.environment)
      return pet
    });

    return res.status(200).json(allPets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const createPets = async (req, res) => {
  const images = req?.files?.length
    ? req.files.map(image => image.path)
    : [];
  const idFiles = req?.files?.length
    ? req.files.map(img => img.filename.slice(img.filename.lastIndexOf('/') + 1))
    : [];
  try {
    const {
      name,
      type,
      breed,
      gender,
      environment,
      tags,
      size,
      color,
      age,
      city,
      health,
      description,
      userId
    } = req.body;

    const user = await User.findByPk(userId);
    if (user) {
      const newPet = await Pets.create({
        name,
        type,
        breed: typeof breed === 'object' ? JSON.stringify(breed) : breed,
        gender,
        environment: typeof environment === 'object' ? JSON.stringify(environment) : environment,
        tags,
        size,
        color,
        age,
        city,
        health,
        description,
        photos: images
      });
      await newPet.setUser(user.id);
      return res.status(201).json(newPet);
    }
    idFiles.forEach(idFile => {
      deleteFile(idFile);
    });
    return res.status(400).json({ message: "user invalid" });

  } catch (error) {
    idFiles.forEach(idFile => {
      deleteFile(idFile);
    });
    return res.status(400).json({ message: error.message });
  }
}

export const updatePets = async (req, res) => {
  const imageUploadUrls = req?.files?.length
    ? req.files.map(image => image.path)
    : [];
  const idUploadImages = req?.files?.length
    ? req.files.map(img => img.filename.slice(img.filename.lastIndexOf('/') + 1))
    : [];
  try {
    const { id } = req.params;
    const {
      name,
      type,
      breed,
      gender,
      environment,
      tags,
      size,
      color,
      age,
      city,
      health,
      description,
      status,
      urlPhotosDb,
    } = req.body;

    const pet = await Pets.findByPk(id);

    const urlsDb = urlPhotosDb ? urlPhotosDb : [];

    if (pet && pet.status === "adoptable") {

      const differenceUrlsDb = pet.photos.filter(url => !urlsDb.includes(url));

      const urlPhotosDb = differenceUrlsDb.map(url => url.slice(url.lastIndexOf('/') + 1)); // [idImage.jpg]

      const idImagesDb = urlPhotosDb.map(nameImage => nameImage.slice(0, nameImage.indexOf('.'))); // [idImage]

      idImagesDb.length && idImagesDb.forEach(idFile => {
        deleteFile(idFile);
      });

      const petUpdated = await Pets.update({
        name,
        type,
        breed: typeof breed === 'object' ? JSON.stringify(breed) : breed,
        gender,
        environment: typeof environment === 'object' ? JSON.stringify(environment) : environment,
        tags,
        size,
        color,
        age,
        city,
        health,
        description,
        photos: urlsDb.concat(imageUploadUrls),
        status
      }, {
        where: {
          id
        },
        returning: true,
        plain: true,
      });

      petUpdated[1].dataValues.breed = JSON.parse(petUpdated[1].dataValues.breed)
      petUpdated[1].dataValues.environment = JSON.parse(petUpdated[1].dataValues.environment)

      return res.status(201).json(petUpdated[1].dataValues);
    }

    imageUploadUrls.length && idUploadImages.forEach(idFile => {
      deleteFile(idFile);
    });

    return res.status(400).json({ message: "pet invalid" });

  } catch (error) {
    imageUploadUrls.length && idUploadImages.forEach(idFile => {
      deleteFile(idFile);
    });
    return res.status(400).json({ message: error.message });
  }

}

export const deletePets = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pets.findByPk(id);
    if (pet) {
      await Pets.update({
        status: "adopted",
      }, {
        where: {
          id
        }
      });
      return res.status(200).json({ message: "successfully removed" });
    }
    return res.status(400).json({ message: "pet invalid" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
