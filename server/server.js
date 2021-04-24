import express from 'express';
import devBundle from './devBundle'
import template from '../template';
import path from 'path';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config/config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

const CURRENT_WORKING_DIRECTORY = process.cwd();
devBundle.compile(app);
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIRECTORY, 'dist')));

app.get('/', (_req, res) => res.status(200).send(template()));

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

