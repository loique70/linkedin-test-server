// controllers/sectorController.ts
import Sector from "../Models/sectorModel";

export const getSectors = async (req: any, res: any) => {
  const parent = req.query.parent;
  const sectors = await Sector.find({ parent: parent });
  res.send(sectors);
};

export const addSector = async (req: any, res: any) => {
  const sectors = req.body;

  // Créez un tableau pour stocker les nouvelles instances de secteur
  const newSectors = [];

  for (const sectorData of sectors) {
    const { name, value } = sectorData;

    // Vérifiez si le secteur existe déjà
    const existingSector = await Sector.findOne({ value: value });
    if (existingSector) {
      return res
        .status(400)
        .send({ message: `Sector with value ${value} already exists` });
    }

    // Créez un nouveau secteur et ajoutez-le au tableau
    const sector = new Sector({ name, value });
    newSectors.push(sector);
  }

  // Sauvegardez tous les nouveaux secteurs dans la base de données
  for (const sector of newSectors) {
    await sector.save();
  }

  res.status(201).send(newSectors);
};

// Ajoutez d'autres méthodes de contrôleur au besoin
