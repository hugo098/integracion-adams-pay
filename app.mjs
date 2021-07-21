import express from 'express';
import hbs from 'hbs';
import * as path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import * as http from 'http';
import dotenv from 'dotenv/config.js';
import { approotdir } from './approotdir.mjs';
const __dirname = approotdir;
import {
    normalizePort, onError, onListening, handle404, basicErrorHandler
} from './appsupport.mjs';




export const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
// uncomment after placing you favicon in /public
//app.use(favicon(path.join(__dirname, 'public/', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json({
    verify: function (req, res, buf, encoding) {
        // raw body for signature check
        req.rawBody = buf.toString();
    }
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router function lists
import productRoutes from './routes/productRoutes.mjs';
import debtRoutes from './routes/debtsRoutes.mjs';
import webhook from './routes/webhook.mjs';
app.use(debtRoutes);
app.use('/products', productRoutes);
app.use('/webhook', webhook);

// error handlers
// catch 404 and forward to error handler
app.use(handle404);
app.use(basicErrorHandler);

export const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

export const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
import mongoose from 'mongoose';
try {
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('Data base connection established');
} catch (error) {
    console.log('error')
}

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
});

/*import { default as Debt } from './models/Debts.mjs';

const p = new Debt({amount: 500000, status:'Pending'});

p.save();*/

