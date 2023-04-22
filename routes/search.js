import { Router } from "express";
import xss from "xss";
import { userData } from "../data/index.js";
import * as validation from "../utils/validation.js";
import { searchMovie } from "../utils/helper.js"; 

const router = Router();

router
    .route('/movies/:movieTitle')
    .get(async (req, res) => {
        let movieTitle = xss(req.params.movieTitle);

        try {
            movieTitle = await validation.checkMovieId(movieTitle);
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            const movieInfo = await searchMovie(movieTitle);
            res.render('searchResults', {results: movieInfo});
        } catch (error) {
            return res.status(500).json({error: error});
        }
    });

router
    .route('/users/:username')
    .get(async (req, res) => {
        let username = xss(req.params.username);

        try {
            username = validation.checkString(username, "Username search query");
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            const users = await userData.getUserByUsernamePartial(username);
            res.render('searchResults', {results: users});
        } catch (error) {
            return res.status(500).json({error: error});
        }
    });

export default router;