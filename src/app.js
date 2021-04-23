import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import cors from 'cors';
import errorHandler from './common/middleware/errorHandler';

import './common/utils/envConfig';
import './common/utils/connection';
import './common/passport';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use(errorHandler);

export default app;
