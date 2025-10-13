CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    nombre VARCHAR(100),
    telefono VARCHAR(100),
    colonia VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    verificado BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE reportes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('seguridad','alumbrado','vialidad', 'emergencia')),
    subtipo VARCHAR(100),
    titulo VARCHAR(200),
    descripcion TEXT,
    latitud DECIMAL (10,8) NOT NULL,
    longitud DECIMAL (11,8) NOT NULL,
    direccion VARCHAR(300),
    urgencia VARCHAR(20) DEFAULT 'media' CHECK (urgencia IN ('baja','media','alta','critica')),
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN('pendiente','confirmado','en_proceso','resuelto','rechazado')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE confirmaciones(
    id SERIAL PRIMARY KEY,
    reporte_id INTEGER NOT NULL REFERENCES reportes(id) ON DELETE CASCADE,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(reporte_id,usuario_id)
);

CREATE TABLE comentarios(
    id SERIAL PRIMARY KEY,
    reporte_id INTEGER NOT NULL REFERENCES reportes(id) ON DELETE CASCADE,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    contenido TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE evidencias(
    id SERIAL PRIMARY KEY,
    reporte_id INTEGER NOT NULL REFERENCES reportes(id) ON DELETE CASCADE,
    usuario_id INTEGER REFERENCES usuarios(id),
    url_archivo VARCHAR(500) NOT NULL,
    tipo_archivo VARCHAR(50) CHECK (tipo_archivo IN ('imagen','video')),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE colonias(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    municipio VARCHAR (100) DEFAULT 'zapopan',
    bounds JSONB
);

CREATE TABLE categorias(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo_padre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    icono VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE
);
