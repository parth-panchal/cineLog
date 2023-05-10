//The route will always be taking an ID parameter and it needs get, put, post, and delete routes

import {Router} from 'express';
const router = Router()
import { activityData, userData } from '../data/index.js'
import { ObjectId } from 'mongodb';
import * as helpers from "../utils/helper.js"
import { getMovieInfo } from "../utils/helper.js";
import * as validation from "../utils/validation.js"
import middleware from "../middleware.js";
import xss from "xss";
    
router
    .route('/:id')
    .all(middleware.ensureCorrectUserActivity)
    .get(async (req, res) => {
        let isAuthenticated = req.session.user ? true : false;

        let activityId = xss(req.params.id); 
        
        if (isAuthenticated) { 
        try {
            activityId = await validation.checkId(activityId)
        } catch (error) {
            return res.status(400).render('error', {isAuthenticated: isAuthenticated}).json({error: error});
        }
        
        try {
            const activityInfo = await activityData.getLogById(activityId);
            const movieInfo = await getMovieInfo(activityInfo.movieId);
            res.status(200).render('activityById', {title: "Activity", results : activityInfo, movieName : movieInfo.title, poster_path : movieInfo.poster_path, isAuthenticated: isAuthenticated });
          } catch (e) {
            res.status(404).render('error',{ error: "Activity not found with the provided id"});
            //render the error handlebar for all the catch
            return;
        }
    }
    })

    .delete(async (req,res) => {
        let isAuthenticated = req.session.user ? true : false;

        let activityId = xss(req.params.id);
        if (isAuthenticated) { 
        try {
            activityId = await validation.checkId(activityId)
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            await activityData.getLogById(activityId);
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            deletedActivity = await activityData.deleteLog(activityId)
            res.status(200).json({ message: 'Log deleted successfully', deletedActivity });
        } catch (error) {
            res.status(500).json({ error});
        }
    }
    })

    .patch(async (req, res) => {
        let isAuthenticated = req.session.user ? true : false;

        let activityInfo = req.body;
        let activityId = xss(req.params.id);
        let userId = xss(req.session.user._id);
        let movieId = xss(activityInfo.movieId);        
        let review = xss(activityInfo.review);; 
        let rating = xss(activityInfo.rating);
        let date = xss(activityInfo.date);

        //here user id will remain the same
        //the only things that the user can change are review rating movie id and date
        if (isAuthenticated) { 

        try{
            const updatedActivity = await activityData.editLog(activityId, movieId, userId, review, rating, date);
            res.status(200).json({ message: 'Log updated successfully', updatedActivity });
        } catch (error) {
            return res.status(400).render('error', { error: error.toString() });
        }
    }
    })

export default router;