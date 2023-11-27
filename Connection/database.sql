-- tabla usuarios --
CREATE TABLE IF NOT EXISTS usuarios  (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  identificacion VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  celular VARCHAR(15) NOT NULL
);

-- tabla cursos --
CREATE TABLE IF NOT EXISTS cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  creditos INT NOT NULL
);

-- tabla unidades --
CREATE TABLE IF NOT EXISTS unidades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cursos_id INT NOT NULL,
  usuario_id INT NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  introduccion VARCHAR(255) NOT NULL,
  fecha_creacion DATE NOT NULL,
  hora_creacion TIME NOT NULL,
  activa TINYINT NOT NULL,
  FOREIGN KEY (cursos_id) REFERENCES cursos(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- tabla actividades --
CREATE TABLE IF NOT EXISTS actividades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unidad_id INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  actividadescol VARCHAR(255) NOT NULL,
  FOREIGN KEY (unidad_id) REFERENCES unidades(id)
);

-- Insertar datos en la tabla usuarios --
INSERT INTO usuarios (nombres, apellidos, email, identificacion, fecha_nacimiento, username, password, celular)
VALUES 
('Juan', 'Pérez', 'juan@example.com', '123456789', '1990-01-15', 'juanito123', 'contrasena123', '31531514'),
('María', 'Gómez', 'maria@example.com', '987654321', '1988-05-22', 'maria88', 'password456', '421412412'),
('Carlos', 'López', 'carlos@example.com', '456789012', '1995-09-10', 'carlitos', 'clave789', '4567890123'),
('Laura', 'Rodríguez', 'laura@example.com', '345678901', '1993-07-08', 'laurita', 'contrasena456', '5678901234'),
('Pedro', 'Martínez', 'pedro@example.com', '567890123', '1998-11-30', 'pedrito', 'clave123', '6789012345'),
('Ana', 'Gutiérrez', 'ana@example.com', '234567890', '1985-04-18', 'anita', 'password789', '7890123456'),
('Sergio', 'Díaz', 'sergio@example.com', '890123456', '1991-09-25', 'sergito', 'contrasena789', '8901234567'),
('Carmen', 'Vargas', 'carmen@example.com', '012345678', '1987-03-12', 'carmencita', 'clave456', '9012345678');

-- Insertar datos en la tabla cursos --
INSERT INTO cursos (nombre, creditos)
VALUES 
('Matemáticas', 4),
('Historia', 3),
('Programación', 5),
('Literatura', 4),
('Química', 5),
('Economía', 3),
('Arte', 2),
('Biología', 4);

-- Insertar datos en la tabla unidades --
INSERT INTO unidades (cursos_id, usuario_id, nombre, introduccion, fecha_creacion, hora_creacion, activa)
SELECT 1, 1, 'Álgebra', 'Introducción al álgebra', '2023-01-05', '08:30:00', 1
UNION ALL
SELECT 1, 2, 'Geometría', 'Introducción a la geometría', '2023-02-10', '10:15:00', 1
UNION ALL
SELECT 2, 3, 'Edad Antigua', 'Introducción a la edad antigua', '2023-03-20', '14:00:00', 1
UNION ALL
SELECT 3, 4, 'Oferta y Demanda', 'Introducción a la oferta y demanda', '2023-04-15', '09:45:00', 1
UNION ALL
SELECT 4, 1, 'Pintura Renacentista', 'Introducción a la pintura renacentista', '2023-05-20', '11:30:00', 1
UNION ALL
SELECT 5, 5, 'Genética', 'Introducción a la genética', '2023-06-25', '13:20:00', 1
UNION ALL
SELECT 2, 3, 'Reacciones Químicas', 'Introducción a las reacciones químicas', '2023-07-30', '15:10:00', 1
UNION ALL
SELECT 1, 2, 'Literatura Clásica', 'Introducción a la literatura clásica', '2023-08-05', '17:00:00', 1;

-- Insertar datos en la tabla actividades --
INSERT INTO actividades (unidad_id, titulo, descripcion, actividadescol)
SELECT 1, 'Ecuaciones lineales', 'Resolver ecuaciones lineales', 'Actividad 1'
UNION ALL
SELECT 1, 'Operaciones con matrices', 'Realizar operaciones con matrices', 'Actividad 2'
UNION ALL
SELECT 2, 'Figuras geométricas', 'Identificar figuras geométricas', 'Actividad 3'
UNION ALL
SELECT 3, 'Herencia Genética', 'Estudio de la herencia genética', 'Actividad 4'
UNION ALL
SELECT 2, 'Leonardo da Vinci', 'Análisis de las obras de Leonardo da Vinci', 'Actividad 5'
UNION ALL
SELECT 4, 'Balance Químico', 'Realizar balance químico de ecuaciones', 'Actividad 6'
UNION ALL
SELECT 1, 'Demanda del Mercado', 'Análisis de la demanda del mercado', 'Actividad 7'
UNION ALL
SELECT 5, 'Ecosistemas', 'Estudio de los ecosistemas', 'Actividad 8';
