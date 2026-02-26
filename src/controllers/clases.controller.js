import * as servicio from '../services/clases.service.js';

/*  Obtiene todas las clases */
export const getClases = async (req, res) => {
  try { res.json(await servicio.getClases()); }
  catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Obtiene una clase por ID */
export const getClase = async (req, res) => {
  try {
    const datos = await servicio.getClase(req.params.id);
    if (!datos) return res.status(404).json({ error: 'Clase no encontrada' });
    res.json(datos);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Crea una nueva clase */
export const postClase = async (req, res) => {
  try {
    const { nombre, aforo_maximo, fecha_hora } = req.body;
    if (!nombre || !aforo_maximo || !fecha_hora)
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    res.status(201).json(await servicio.postClase({ nombre, aforo_maximo, fecha_hora }));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Actualiza una clase existente */
export const putClase = async (req, res) => {
  try {
    const { nombre, aforo_maximo, fecha_hora, estado } = req.body;
    if (!nombre || !aforo_maximo || !fecha_hora)
      return res.status(400).json({ error: 'PUT requiere todos los campos' });
    const datos = await servicio.putClase(req.params.id, { nombre, aforo_maximo, fecha_hora, estado });
    if (!datos) return res.status(404).json({ error: 'Clase no encontrada' });
    res.json(datos);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Actualiza parcialmente una clase existente */
export const patchClase = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({ error: 'No se enviaron campos' });
    const datos = await servicio.patchClase(req.params.id, req.body);
    if (!datos) return res.status(404).json({ error: 'Clase no encontrada' });
    res.json(datos);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Elimina una clase por ID */
export const deleteClase = async (req, res) => {
  try {
    const ok = await servicio.deleteClase(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Clase no encontrada' });
    res.json({ mensaje: 'Clase eliminada correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};