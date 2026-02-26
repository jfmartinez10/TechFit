import * as servicio from '../services/reservas.service.js';

/*  Obtiene todas las reservas */
export const getReservas = async (req, res) => {
  try { res.json(await servicio.getReservas()); }
  catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Obtiene una reserva por ID */
export const getReserva = async (req, res) => {
  try {
    const datos = await servicio.getReserva(req.params.id);
    if (!datos) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(datos);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Crea una nueva reserva */
export const postReserva = async (req, res) => {
  try {
    const { id_usuario, id_clase } = req.body;
    if (!id_usuario || !id_clase)
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    res.status(201).json(await servicio.postReserva({ id_usuario, id_clase }));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Cancela una reserva existente */
export const patchCancelarReserva = async (req, res) => {
  try {
    const datos = await servicio.patchCancelarReserva(req.params.id);
    if (!datos) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(datos);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Elimina una reserva por ID */
export const deleteReserva = async (req, res) => {
  try {
    const ok = await servicio.deleteReserva(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json({ mensaje: 'Reserva eliminada correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};