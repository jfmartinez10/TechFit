import pool from '../db.js';

/*  Obtiene todos los usuarios */
export const getUsuarios = async () => {
  const { rows } = await pool.query('SELECT * FROM usuarios');
  return rows;
};

/*  Obtiene un usuario por ID */
export const getUsuario = async (id) => {
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return rows[0] || null;
};

/*  Crea un nuevo usuario */
export const postUsuario = async ({ nombre, email, fecha_fin_suscripcion }) => {
  const { rows } = await pool.query(
    `INSERT INTO usuarios (nombre, email, fecha_fin_suscripcion)
     VALUES ($1, $2, $3) RETURNING id`,
    [nombre, email, fecha_fin_suscripcion]
  );
  return getUsuario(rows[0].id);
};

/*  Actualiza un usuario existente */
export const putUsuario = async (id, { nombre, email, fecha_fin_suscripcion }) => {
  const { rowCount } = await pool.query(
    `UPDATE usuarios SET nombre=$1, email=$2, fecha_fin_suscripcion=$3 WHERE id=$4`,
    [nombre, email, fecha_fin_suscripcion, id]
  );
  if (rowCount === 0) return null;
  return getUsuario(id);
};

/*  Actualiza parcialmente un usuario existente */
export const patchUsuario = async (id, campos) => {
  const permitidos = ['nombre', 'email', 'fecha_fin_suscripcion'];
  const sets   = [];
  const values = [];
  let   idx    = 1;

  /*  Construye dinámicamente el SET de la consulta según los campos enviados */
  for (const [clave, valor] of Object.entries(campos)) {
    if (permitidos.includes(clave)) {
      sets.push(`${clave} = $${idx}`);
      values.push(valor);
      idx++;
    }
  }

  /*  Si no se enviaron campos válidos, lanza un error */
  if (sets.length === 0) throw new Error('Sin campos válidos');

  values.push(id);
  const { rowCount } = await pool.query(
    `UPDATE usuarios SET ${sets.join(', ')} WHERE id = $${idx}`, values
  );
  if (rowCount === 0) return null;
  return getUsuario(id);
};

/*  Elimina un usuario por ID */
export const deleteUsuario = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
  return rowCount > 0;
};