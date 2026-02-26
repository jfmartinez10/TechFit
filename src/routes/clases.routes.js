import { Router } from 'express';
import * as ctrl from '../controllers/clases.controller.js';

const router = Router();

router.get('/',       ctrl.getClases);
router.get('/:id',    ctrl.getClase);
router.post('/',      ctrl.postClase);
router.put('/:id',    ctrl.putClase);
router.patch('/:id',  ctrl.patchClase);
router.delete('/:id', ctrl.deleteClase);

export default router;