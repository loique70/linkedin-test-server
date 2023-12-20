import express from "express";
import * as sectorController from "../Controllers/sectorController";

const router = express.Router();

router.get("/sectors", sectorController.getSectors);
router.post("/sectors", sectorController.addSector);

export default router;
