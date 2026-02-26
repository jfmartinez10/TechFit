import cron from 'node-cron';
import pool from '../db.js';

// Marca como 'finalizada' cualquier clase cuya fecha_hora ya ha pasado
cron.schedule('0 0 * * *', async () => {
  console.log('[CRON] Ejecutando tarea: marcar clases finalizadas...');

  /*  La consulta actualiza el estado de las clases que ya han ocurrido y que aún están activas */
  try {
    const { rowCount } = await pool.query(`
      UPDATE clases
      SET estado = 'finalizada'
      WHERE fecha_hora < NOW()
        AND estado = 'activa'
    `);
    /*  rowCount indica cuántas filas fueron actualizadas */
    console.log(`[CRON] Clases marcadas como finalizadas: ${rowCount}`);
    /*  Si rowCount es 0, significa que no había clases para actualizar, lo cual también es un resultado válido */
  } catch (err) {
    /*  Si ocurre un error, se captura y se muestra en la consola */
    console.error('[CRON] Error al marcar clases:', err.message);
  }
});

console.log('[CRON] Tarea programada: marcar clases finalizadas cada día a las 00:00');