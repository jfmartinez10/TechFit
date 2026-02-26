import pool from '../db.js';

/*  Obtiene todas las reservas */
export const getReservas = async () => {
  const { rows } = await pool.query('SELECT * FROM reservas');
  return rows;
};

/*  Obtiene una reserva por ID */
export const getReserva = async (id) => {
  const { rows } = await pool.query('SELECT * FROM reservas WHERE id = $1', [id]);
  return rows[0] || null;
};

/*  Crea una nueva reserva */
export const postReserva = async ({ id_usuario, id_clase }) => {
  // Comprobar que la clase tiene hueco
  const { rows: claseRows } = await pool.query(
    `SELECT c.aforo_maximo,
            COUNT(r.id) AS reservas_activas
     FROM clases c
     LEFT JOIN reservas r ON r.id_clase = c.id AND r.estado_reserva = 'activa'
     WHERE c.id = $1
     GROUP BY c.id`,
    [id_clase]
  );

  if (claseRows.length === 0) throw new Error('Clase no encontrada');

  /* Si el número de reservas activas es igual o superior al aforo máximo, no se puede reservar */
  const { aforo_maximo, reservas_activas } = claseRows[0];
  if (parseInt(reservas_activas) >= parseInt(aforo_maximo))
    throw new Error('La clase no tiene aforo disponible');

  // Comprobar que la suscripción está vigente
  const { rows: usuarioRows } = await pool.query(
    'SELECT fecha_fin_suscripcion FROM usuarios WHERE id = $1', [id_usuario]
  );

  if (usuarioRows.length === 0) throw new Error('Usuario no encontrado');

  const hoy = new Date();
  const finSuscripcion = new Date(usuarioRows[0].fecha_fin_suscripcion);
  if (finSuscripcion < hoy) throw new Error('La suscripción del usuario ha caducado');

  // Crear la reserva
  const { rows } = await pool.query(
    `INSERT INTO reservas (id_usuario, id_clase)
     VALUES ($1, $2) RETURNING id`,
    [id_usuario, id_clase]
  );
  return getReserva(rows[0].id);
};

/*  Cancela una reserva existente */
export const patchCancelarReserva = async (id) => {
  const { rowCount } = await pool.query(
    `UPDATE reservas SET estado_reserva = 'cancelada' WHERE id = $1`, [id]
  );
  if (rowCount === 0) return null;
  return getReserva(id);
};

/*  Elimina una reserva por ID */
export const deleteReserva = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM reservas WHERE id = $1', [id]);
  return rowCount > 0;
};