CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  fecha_fin_suscripcion DATE NOT NULL,
  /*Fecha y hora de creación del registro para control interno y métricas.*/
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clases (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  aforo_maximo INT NOT NULL,
  fecha_hora TIMESTAMPTZ NOT NULL,
  estado VARCHAR(20) DEFAULT 'activa',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservas (
  id SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  id_clase INT NOT NULL REFERENCES clases(id) ON DELETE CASCADE,
  estado_reserva VARCHAR(20) DEFAULT 'activa',
  created_at TIMESTAMPTZ DEFAULT NOW()
);