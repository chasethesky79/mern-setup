import express from 'express';
import devBundle from './devBundle'
import template from '../template';

const express = express();
const CURRENT_WORKING_DIRECTORY = process.cwd();
devBundle.compile(app);
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIRECTORY, 'dist')));

const port = 9000;
app.get('/', (_req, res) => res.status(200).send(template()));

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`[app]: http://localhost:${port}`);
    }
});

