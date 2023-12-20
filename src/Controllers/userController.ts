// controllers/userController.ts
import User from "../Models/userModel";
import Sector from "../Models/sectorModel";

export const createUser = async (req: any, res: any) => {
  const { name, sectors, terms } = req.body;

  // Validate input data
  if (!name || !sectors || !terms) {
    return res.status(400).send({ message: "All fields are mandatory" });
  }

  // Check if sectors exist in the database
  const existingSectors = await Sector.find({ value: { $in: sectors } });
  if (existingSectors.length !== sectors.length) {
    return res.status(400).send({ message: "One or more sectors are invalid" });
  }

  const user = new User({ name, sectors, terms });
  await user.save();
  res.status(201).send(user);
};

// controllers/userController.ts
export const updateUser = async (req: any, res: any) => {
  const { name, sectors, terms } = req.body;
  const { id } = req.params;
  // Validate input data
  if (!id || !name || !sectors || !terms) {
    return res.status(400).send({ message: "All fields are mandatory" });
  }

  // Check if sectors exist in the database
  const existingSectors = await Sector.find({ value: { $in: sectors } });
  if (existingSectors.length !== sectors.length) {
    return res.status(400).send({ message: "One or more sectors are invalid" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  user.name = name;
  user.sectors = sectors;
  user.terms = terms;
  await user.save();

  res.status(200).send(user);
};
