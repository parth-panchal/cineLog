//The route will always be taking an ID parameter and it needs get, put, post, and delete routes

import {Router} from 'express';
const router = Router()
import {activityData} from '../data/activity.js'
import { cineLogData } from '../data/index.js';
import {ObjectId} from 'mongodb';
import * as helpers from "../utils/helper.js"
import * as validation from "../utils/validation.js"

router
    .route('/')
    .get(async (req, res) => {
        try {
            const activityInfo = await activityData.getAllLogs();
            console.log(activityInfo)
          } catch (e) {
            res.status(404).json({ error: "No Activities Found"});
            return;
        }
    })
    .post(async (req, res) => {
        activityInfo = req.body;
        let userId = req.session.user.id;
        let movieId = xss(req.body.movieId);
        let review = undefined;
        let rating = undefined;
        let date = undefined;
        validation.checkProvided(movieId, userId, review, rating);
        movieId = await validation.checkMovieId(movieId, "Movie ID");
        userId = validation.checkId(userId, "User ID"); // need to add check here from user data functions to see if user exists?
        review = validation.checkString(review, "Review");
        rating = validation.checkRating(rating, "Rating");
        date = validation.checkDate(date, "Date");
        

        try{
            const { movieId, userId, review, rating, date } = activityInfo;
             
            const newActivity = await activityData.create(
                movieId, 
                userId, 
                review, 
                rating, 
                date
            );
            res.json(newActivity);
           }catch(e){
            res.status(500).send(e);
           }
    })
    .route('/:id')
    .get(async (req, res) => {
        // if (!ObjectId.isValid(req.params.id)) {
        //     res.status(400).json({ error: "Provided id is not valid" });
        //     return;
        // }
        let activityId = xss(req.params.id);

        try {
            activityId = await validation.checkMovieId(activityId);
        } catch (error) {
            return res.status(400).json({error: error});
        }
        try {
            const activityInfo = await activityData.getLogById(activityId);
            console.log(activityInfo)
          } catch (e) {
            res.status(404).json({ error: "Activity not found with the provided id"});
            return;
        }
    })
    