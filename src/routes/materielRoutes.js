import { Router } from "express";
import {createMateriel, deleteMateriel, fetchMateriel, modifyMateriel, stat} from './../controllers/materielController.js';

const router = Router();

router.post('/', createMateriel);
router.get('/', fetchMateriel);
router.patch('/', modifyMateriel);
router.delete('/', deleteMateriel);
router.get('/stat', stat);

export default router;