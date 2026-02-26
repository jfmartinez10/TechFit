import { Router } from 'express';
import * as ctrl from '../controllers/reservas.controller.js';

const router = Router();

router.get('/',               ctrl.getReservas);
router.get('/:id',            ctrl.getReserva);
router.post('/',              ctrl.postReserva);
router.patch('/:id/cancelar', ctrl.patchCancelarReserva);
router.delete('/:id',         ctrl.deleteReserva);

export default router;