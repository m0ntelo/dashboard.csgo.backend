const express = require('express');
const cors = require('cors');

import { Request, Response, Application } from 'express';
import { GetAllMaps, GetMapsById } from './functions';

const urlencoded = express.urlencoded({ extended: true });
const app: Application = express().use(urlencoded).use(cors());

app.post('/GetAllMaps', (req: Request, res: Response) => {
    let collectionId, collectionCount;

    collectionId = req.body.collectionId;
    collectionCount = req.body.collectionCount;

    GetAllMaps(collectionId, collectionCount)
        .then(response => res.send(response))
        .catch(response => res.send(response));
});

app.post('/GetMapsById', (req: Request, res: Response) => {
    let collectionId, itemCount;
    
    collectionId = req.body.collectionId;
    itemCount = req.body.itemCount;

    GetMapsById(collectionId, itemCount)
        .then((response) => res.send(response))
        .catch(response => res.send(response));
});

app.listen(3000, () => console.log('start server!'));