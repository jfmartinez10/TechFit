import * as servicio from '../services/usuarios.service.js';

/*  Obtiene todos los usuarios */
export const getUsuarios = async (req, res) => {
  try { res.json(await servicio.getUsuarios()); }
  catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Obtiene un usuario por ID */
export const getUsuario = async (req, res) => {
  try {
    const datos = await servicio.getUsuario(req.params.id);
    if (!datos) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(datos);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Crea un nuevo usuario */
export const postUsuario = async (req, res) => {
  try {
    const { nombre, email, fecha_fin_suscripcion } = req.body;
    if (!nombre || !email || !fecha_fin_suscripcion)
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    res.status(201).json(await servicio.postUsuario({ nombre, email, fecha_fin_suscripcion }));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Actualiza un usuario existente */
export const putUsuario = async (req, res) => {
  try {
    const { nombre, email, fecha_fin_suscripcion } = req.body;
    if (!nombre || !email || !fecha_fin_suscripcion)
      return res.status(400).json({ error: 'PUT requiere todos los campos' });
    const datos = await servicio.putUsuario(req.params.id, { nombre, email, fecha_fin_suscripcion });
    if (!datos) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(datos);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Actualiza parcialmente un usuario existente */
export const patchUsuario = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({ error: 'No se enviaron campos' });
    const datos = await servicio.patchUsuario(req.params.id, req.body);
    if (!datos) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(datos);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

/*  Elimina un usuario por ID */
export const deleteUsuario = async (req, res) => {
  try {
    const ok = await servicio.deleteUsuario(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};