import express from 'express';
import { getModules, getOneModule, createModule, updateModule, deleteModule, completeModule } from '../controllers/modules.js'

const router = express.Router();

router.get('/', getModules);
router.get('/:id', getOneModule);
router.post('/', createModule);
router.patch('/', updateModule);
router.delete('/', deleteModule);


export default router;