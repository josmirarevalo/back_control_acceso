require('./config/config');

const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');   
const path = require('path');
const helmet = require('helmet');
//const Sentry = require('@sentry/node');
//const Tracing = require("@sentry/tracing");

// const csrf = require('csurf');

// const csrfProtection = csrf({
//     cookie: true
// });

// Configuración de Swagger 
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Sentry.init({
//   dsn: "https://37a77abbba214d55a2e92aac8c95a09d@o311842.ingest.sentry.io/5623719",
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Tracing.Integrations.Express({ app }),
//   ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
//   tracesSampleRate: 1.0,
// });

// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());

app.use(fileUpload());

app.use(helmet());

app.use(cors());

//app.use(csrfProtection);

const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Express 3.0
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended:true, limit: '50mb' }));
// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));
//app.use(express.static(path.resolve(__dirname, '../uploads')));
app.use("/uploads", express.static(path.resolve(__dirname, '../uploads')));

// Configuración global de rutas
app.use(require('./routes/index'));

// app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(res.sentry + "\n");
// });

app.listen(process.env.PORT, () => {
    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument)); 
    console.log('Escuchando puerto: ', process.env.PORT);
});