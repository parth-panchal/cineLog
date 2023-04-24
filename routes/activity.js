//The route will always be taking an ID parameter and it needs get, put, post, and delete routes

import {Router} from 'express';
const router = Router()
import { activityData, userData } from '../data/index.js'
import { ObjectId } from 'mongodb';
import * as helpers from "../utils/helper.js"
import * as validation from "../utils/validation.js"
import xss from "xss";


router
    .route('/')
    .get(async (req, res) => {
        try {
            const activityInfo = await activityData.getAllLogs();
            console.log(activityInfo)
            res.status(200).send(activityInfo);
        } catch (e) {
            res.status(404).json({ error: "No Activities Found"});
            return;
        }
    })
    .post(async (req, res) => {
        activityInfo = req.body;
        //let userId = activityInfo.userId;
        let userId = req.session.user.id;
        let movieId = xss(req.body.movieId);
        let review = activityInfo.review;
        let rating = activityInfo.rating;
        let date = activityInfo.date;
        validation.checkProvided(movieId, userId, review, rating);
        movieId = await validation.checkMovieId(movieId, "Movie ID");
        userId = validation.checkId(userId, "User ID"); 
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

router
    .route('/:id')
    .get(async (req, res) => {
        // if (!ObjectId.isValid(req.params.id)) {
        //     res.status(400).json({ error: "Provided id is not valid" });
        //     return;
        // }
        let activityId = xss(req.params.id);

        try {
            activityId = await validation.checkId(activityId)
        } catch (error) {
            return res.status(400).json({error: error});
        }
        try {
            const activityInfo = await activityData.getLogById(activityId);
            console.log(activityInfo)
            res.status(200).send(activityInfo);

            
          } catch (e) {
            res.status(404).json({ error: "Activity not found with the provided id"});
            return;
        }
    })

    .delete(async (req,res) => {
        let activityId = xss(req.params.id);
        try {
            activityId = await validation.checkId(activityId)
        } catch (error) {
            return res.status(400).json({error: error});
        }
        try {
            await activityData.get(activityId);
        } catch (error) {
            return res.status(400).json({error: error});
        }
        try {
            await activityData.deleteLog(activityId)
        } catch (error) {
            res.status(500).json({ e });
        }
    })

    .patch(async (req, res) => {
        let activityInfo = req.body;
        // let userId = activityInfo.userId;
        let activityId = xss(req.params.id);
        let userId = req.session.user.id;
        let movieId = xss(req.body.movieId);
        let review = activityInfo.review;
        let rating = activityInfo.rating;
        let date = activityInfo.date;
        validation.checkProvided(movieId, userId, review, rating);
        movieId = await validation.checkMovieId(movieId, "Movie ID");
        userId = validation.checkId(userId, "User ID"); 
        review = validation.checkString(review, "Review");
        rating = validation.checkRating(rating, "Rating");
        date = validation.checkDate(date, "Date");

        //here user id will remain the same
        //the only things that the user can change are review rating movie id and date
        try{
            const updatedActivity = await activityData.editLog(activityId, movieId, userId, review, rating, date);
            res.status(200).json({ message: 'Log updated successfully', updatedActivity });

        } catch (error) {
            return res.status(400).json({error: error});
        }
    })
    
    export default router;