import express from 'express';
import devBundle from './devBundle'
import template from '../template';
import path from 'path';
import { MongoClient } from 'mongodb';

const app = express();
const CURRENT_WORKING_DIRECTORY = process.cwd();
devBundle.compile(app);
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIRECTORY, 'dist')));

const port = process.env.PORT || 3000
app.get('/', (_req, res) => res.status(200).send(template()));

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

