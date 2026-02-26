import pool from '../db.js';

/*  Obtiene todas las clases */
export const getClases = async () => {
  const { rows } = await pool.query(`
    SELECT c.*,
           c.aforo_maximo - COUNT(r.id) AS aforo_restante
    FROM clases c
    LEFT JOIN reservas r ON r.id_clase = c.id AND r.estado_reserva = 'activa'
    GROUP BY c.id
    ORDER BY c.fecha_hora ASC
  `);
  return rows;
};

/*  Obtiene una clase por ID */
export const getClase = async (id) => {
  const { rows } = await pool.query('SELECT * FROM clases WHERE id = $1', [id]);
  return rows[0] || null;
};

/*  Crea una nueva clase */
export const postClase = async ({ nombre, aforo_maximo, fecha_hora }) => {
  const { rows } = await pool.query(
    `INSERT INTO clases (nombre, aforo_maximo, fecha_hora)
     VALUES ($1, $2, $3) RETURNING id`,
    [nombre, aforo_maximo, fecha_hora]
  );
  return getClase(rows[0].id);
};

/*  Actualiza completamente una clase por ID */
export const putClase = async (id, { nombre, aforo_maximo, fecha_hora, estado }) => {
  const { rowCount } = await pool.query(
    `UPDATE clases SET nombre=$1, aforo_maximo=$2, fecha_hora=$3, estado=$4 WHERE id=$5`,
    [nombre, aforo_maximo, fecha_hora, estado || 'activa', id]
  );
  if (rowCount === 0) return null;
  return getClase(id);
};

/*  Actualiza parcialmente una clase por ID */
export const patchClase = async (id, campos) => {
  const permitidos = ['nombre', 'aforo_maximo', 'fecha_hora', 'estado'];
  const sets   = [];
  const values = [];
  let   idx    = 1;

  /*  Recorre los campos a actualizar y construye la consulta dinámicamente */
  for (const [clave, valor] of Object.entries(campos)) {
    if (permitidos.includes(clave)) {
      sets.push(`${clave} = $${idx}`);
      values.push(valor);
      idx++;
    }
  }

  /*  Si no hay campos válidos, lanza un error */
  if (sets.length === 0) throw new Error('Sin campos válidos');

  values.push(id);
  const { rowCount } = await pool.query(
    `UPDATE clases SET ${sets.join(', ')} WHERE id = $${idx}`, values
  );
  if (rowCount === 0) return null;
  return getClase(id);
};

/*  Elimina una clase por ID */
export const deleteClase = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM clases WHERE id = $1', [id]);
  return rowCount > 0;
};