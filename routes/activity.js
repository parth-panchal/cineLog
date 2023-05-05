//The route will always be taking an ID parameter and it needs get, put, post, and delete routes

import {Router} from 'express';
const router = Router()
import { activityData, userData } from '../data/index.js'
import { ObjectId } from 'mongodb';
import * as helpers from "../utils/helper.js"
import { getMovieInfo } from "../utils/helper.js";
import * as validation from "../utils/validation.js"
import xss from "xss";
    
router
    .route('/:id')
    .get(async (req, res) => {
        // if (!ObjectId.isValid(req.params.id)) {
        //     res.status(400).json({ error: "Provided id is not valid" });
        //     return;
        // }
        // console.log("inside route")
        
        let activityId = xss(req.params.id); 
        // console.log(activityId)

        try {
            activityId = await validation.checkId(activityId)
        } catch (error) {
            return res.status(400).json({error: error});
        }
        
        try {
            const activityInfo = await activityData.getLogById(activityId);
            const movieInfo = await getMovieInfo(activityInfo.movieId);


            // console.log(movieInfo)
            // console.log("------------------------")
            res.status(200).render('activityById', {title: "Activity", results : activityInfo, movieName : movieInfo.original_title, poster_path : movieInfo.poster_path });

            
          } catch (e) {
            res.status(404).render('error',{ error: "Activity not found with the provided id"});
            //render the error handlebar for all the catch
            return;
        }
    })

    .delete(async (req,res) => {
        let activityId = xss(req.params.id);
        // console.log("check1")
        try {
            // console.log("check2")
            activityId = await validation.checkId(activityId)
        } catch (error) {
            return res.status(400).json({error: error});
        }
        try {
            // console.log("check3")
            await activityData.getLogById(activityId);
        } catch (error) {
            return res.status(400).json({error: error});
        }
        try {
            // console.log("check4")
            await activityData.deleteLog(activityId)
        } catch (error) {
            res.status(500).json({ e });
        }

    })


router
    .route('/:id/update')
    .patch(async (req, res) => {
        let activityInfo = req.body;
        console.log(activityInfo)
        let activityId = xss(req.params.id);
        //user session paused for testing
        //let userId = xss(req.session.user.id);
        let movieId = xss(req.params.movieId);
        // let userId = xss(req.params.userId);
        // let review = xss(req.params.review);
        // let movieId = "7968"; //hardcoded
        let userId = "23"; //hardcoded
        let review = "vsguiylwj"; //hardcoded
        let rating = xss(activityInfo.rating);
        let date = xss(activityInfo.date);
        //let movieId = xss(req.body.movieId);
        //validation.checkProvided(movieId, userId, review, rating);
        //movieId = await validation.checkMovieId(movieId, "Movie ID");
        //userId = validation.checkId(userId, "User ID"); 
        //review = validation.checkString(review, "Review");
        // rating = validation.checkRating(rating, "Rating");
        // console.log("check 2")

        // date = validation.checkDate(date, "Date");
        // console.log("check 3")
        console.log(activityId)
        console.log(movieId)
        console.log(userId)
        console.log(review)
        console.log(rating)
        console.log(date)

        //here user id will remain the same
        //the only things that the user can change are review rating movie id and date
        try{
            console.log("in try catch block")
            const updatedActivity = await activityData.editLog(activityId, movieId, userId, review, rating, date);
            console.log("check 2")
            res.status(200).json({ message: 'Log updated successfully', updatedActivity });

        } catch (error) {
            // console.log("in catch error block")
            //return res.status(400).render({error: "There was some problem in updating the log"});
            return res.status(400).render('error', { error: error.toString() });
        }
    })

export default router;