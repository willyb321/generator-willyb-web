import 'source-map-support/register';

import * as express from 'express';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as sassMiddleware from 'node-sass-middleware'
import * as favicon from 'serve-favicon';
import * as bodyParser from 'body-parser';
import {join} from 'path';
import * as responseTime from 'response-time';

import index from './routes/index';

process.on('uncaughtException', (err: Error) => {
	console.log(err);
});

process.on('unhandledRejection', (err: Error) => {
	console.log(err);
});

const app: express.Application = express();
const cacheTime: number = 86400000 * 7;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(favicon(join(__dirname, '..', 'public', 'favicon.ico')));

app.use(responseTime());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// view engine setup
app.set('views', join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use(sassMiddleware({
	src: join(__dirname, '..', 'public'),
	dest: join(__dirname, '..', 'public'),
	indentedSyntax: true, // true = .sass and false = .scss
	sourceMap: true
}));

app.use(express.static(join(__dirname, '..', 'public'), {maxAge: cacheTime}));
app.use('/', index);

export default app;
