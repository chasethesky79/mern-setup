import express from 'express';
import devBundle from './devBundle'
import path from 'path';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config/config';
import mongoose from 'mongoose';
import userRoutes from '../server/routes/user.routes';
import authRoutes from '../server/routes/auth.routes';
import template from '../template';
import { StaticRouter } from 'react-router-dom'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import theme from './../client/theme'
import MainRouter from './../client/MainRouter'

import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => { throw new Error(`unable to connect to database: ${mongoUri}`)})

const CURRENT_WORKING_DIRECTORY = process.cwd();
devBundle.compile(app);
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIRECTORY, 'dist')));

app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('*', (req, res) => {
    const sheets = new ServerStyleSheets()
    const context = {}
    const markup = ReactDOMServer.renderToString(
      sheets.collect(
            <StaticRouter location={req.url} context={context}>
              <ThemeProvider theme={theme}>
                <MainRouter />
              </ThemeProvider>
            </StaticRouter>
          )
      )
      if (context.url) {
        return res.redirect(303, context.url)
      }
      const css = sheets.toString()
      res.status(200).send(template({
        markup: markup,
        css: css
      }))
  })

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: `${err.name} : ${err.message}`})
    } else if (err) {
        res.status(400).json({error: `${err.name} : ${err.message}`})
    }
})

const { port } = config;
app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`[app]: http://localhost:${port}`);
    }
});

// Database Connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },(err, db)=>{
  console.log("Connected successfully to mongodb server")
  db.close()
})

