import { Pets } from '../models/Pets.js';
import { User } from '../models/User.js';
import { TypePet } from '../models/Typepet.js';
import { BreedPet } from '../models/Breedpet.js';
import { deleteFile } from '../middlewares/cloudinary.js';
import { findAllPets, findByPkPets } from '../models/Views/pets.views.js';

export const getPetsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const detailPet = await findByPkPets(id);
      return res.status(200).json(detailPet);
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getAllPets = async (req, res) => {
  try {
    const { name } = req.query;

    if (name === '') {
      const allPets = await findAllPets();
      return res.status(200).json(allPets);
    }

    if (name) {
      const allPets = await findAllPets();
      const petByName = allPets.filter(pet => pet.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
      return res.status(200).json(petByName);
    }
    const allPets = await findAllPets();
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
      typeId,
      breedId,
      typeHair,
      specialCares,
      castrated,
      gender,
      environment,
      tags,
      size,
      color,
      age,
      health,
      description,
      userId
    } = req.body;

    const user = await User.findByPk(userId);
    const type = await TypePet.findByPk(typeId);
    const breed = await BreedPet.findByPk(breedId);

    if (user) {
      const newPet = await Pets.create({
        name,
        typeId,
        breedId,
        typeHair,
        specialCares: typeof specialCares === "boolean" ? specialCares : specialCares == "true",
        castrated: typeof castrated === "boolean" ? castrated : castrated == "true",
        gender,
        environment: typeof environment === 'object' ? JSON.stringify(environment) : environment,
        tags,
        size,
        color,
        age,
        health,
        description,
        photos: images
      });
      await newPet.setUser(user);
      await newPet.setTypepet(type);
      await newPet.setBreedpet(breed);
      const detailPetCreated = await findByPkPets(newPet.id);
      return res.status(201).json({ data: detailPetCreated, message: 'successfully created pet' });
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
      typeId,
      breedId,
      typeHair,
      specialCares,
      castrated,
      gender,
      environment,
      tags,
      size,
      color,
      age,
      health,
      description,
      status,
      urlPhotosDb,
    } = req.body;

    const pet = await Pets.findByPk(id);
    const breed = await BreedPet.findByPk(breedId);
    const type = await TypePet.findByPk(typeId);

    const urlsDb = urlPhotosDb === "" ? [] : urlPhotosDb;

    if (pet && pet.status === "adoptable") {

      const differenceUrlsDb = pet.photos.filter(url => !urlsDb.includes(url));

      const urlPhotosDb = differenceUrlsDb.map(url => url.slice(url.lastIndexOf('/') + 1)); // [idImage.jpg]

      const idImagesDb = urlPhotosDb.map(nameImage => nameImage.slice(0, nameImage.indexOf('.'))); // [idImage]

      idImagesDb.length && idImagesDb.forEach(idFile => {
        deleteFile(idFile);
      });

      const petUpdated = await Pets.update({
        name,
        typeHair,
        specialCares: typeof specialCares === "boolean" ? specialCares : specialCares == "true",
        castrated: typeof castrated === "boolean" ? castrated : castrated == "true",
        gender,
        environment: typeof environment === 'object' ? JSON.stringify(environment) : environment,
        tags,
        size,
        color,
        age,
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

      await pet.setTypepet(type);
      await pet.setBreedpet(breed);

      petUpdated[1].dataValues.environment = JSON.parse(petUpdated[1].dataValues.environment)
      const detailPetUpdated = await findByPkPets(petUpdated[1].dataValues.id);
      return res.status(201).json({ data: detailPetUpdated, message: 'successfully updated pet' });
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
