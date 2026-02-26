import { Router } from 'express';
import * as ctrl from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/',       ctrl.getUsuarios);
router.get('/:id',    ctrl.getUsuario);
router.post('/',      ctrl.postUsuario);
router.put('/:id',    ctrl.putUsuario);
router.patch('/:id',  ctrl.patchUsuario);
router.delete('/:id', ctrl.deleteUsuario);

export default router;