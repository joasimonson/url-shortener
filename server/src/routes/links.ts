import { Router } from 'express';
import linksController from '../controllers/links';

const router = Router();

router.post('/links', linksController.post)

router.get('/links/:code', linksController.hit)

router.get('/links/:code/stats', linksController.get)

export default router;