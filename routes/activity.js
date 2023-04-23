//The route will always be taking an ID parameter and it needs get, put, post, and delete routes

import {Router} from 'express';
const router = Router()
import {activityData} from '../data/activity.js'
import { cineLogData } from '../data/index.js';
import {ObjectId} from 'mongodb';
import * as helpers from "../utils/helper.js"
import * as validation from "../utils/validation.js"

router
    .route('/:id')
    .get(async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: "Provided id is not valid" });
            return;
        }
        try {
            await activityData.getLogById(req.params.id);
          } catch (e) {
            res.status(404).json({ error: "Activity not found with the provided id"});
            return;
        }
    })
    .put('/:id', (req, res) => {
        
    })