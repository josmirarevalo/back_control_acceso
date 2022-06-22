// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 4000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Vencimiento del Token
// ============================
// 1000 milisegundos
// 60 segundos
// 60 minutos
// 24 horas
// 30 días

process.env.TOKEN_EXPIRATION = 3600000;


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'E600E6C8080E2843F48A0710B306A1B679D106A41E8A319E7B952D96FD027EB1';

// ============================
//  Base de datos
// ============================
let urlDB;

// Ruta de la Base de Datos
urlDB = 'postgres://postgres:postgres@localhost:5432/ionix';

process.env.URLDB = urlDB;

process.env.API_URL = '/api/v1';


