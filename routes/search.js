import { Router } from "express";
import xss from "xss";
import { userData } from "../data/index.js";
import * as validation from "../utils/validation.js";
import { searchMovie } from "../utils/helper.js"; 

const router = Router();

// TODO: Implmement proper error page or error rendering
// Possible TODO: Implement pagination for getting movies or users past the 20th one

router
    .route('/')
    .post(async (req, res) => {
        let searchTerm = xss(req.body.searchTerm);
        let searchOption = xss(req.body.searchOption);
        let redirectUrl = "/search";

        try {
            searchTerm = validation.checkString(searchTerm, "Search Term");
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            searchOption = validation.checkString(searchOption, "Search Option");
            if(searchOption !== "movies" && searchOption !== "users") throw `Error: Search Option value can only be 'movies' or 'users`;
            
            redirectUrl = redirectUrl + `/${searchOption}/${searchTerm}`;
        } catch (error) {
            return res.status(400).json({error: error});
        }

        return res.redirect(redirectUrl);

    });

router
    .route('/movies/:searchTerm')
    .get(async (req, res) => {
        let searchTerm = xss(req.params.searchTerm);
        let isAuthenticated = req.session.user ? true : false;
        try {
            searchTerm = validation.checkString(searchTerm, "Movie Title");
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            const moviesInfo = await searchMovie(searchTerm);
            return res.render('searchResults', {
                results: moviesInfo.results,
                noResults: false,
                isMovieSearch: true,
                isAuthenticated
            });
        } catch (error) {
            res.render('searchResults', {
                noResults: true
            });
        }
    });
router
    .route('/movi/:searchTerm')
    .get(async (req, res) => {
        let searchTerm = xss(req.params.searchTerm);
        // console.log(searchTerm);

        try {
            searchTerm = validation.checkString(searchTerm, "Movie Title");
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            const moviesInfo = await searchMovie(searchTerm);
            // console.log(moviesInfo.results);
            return res.json(moviesInfo);
            
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

router
    .route('/users/:searchTerm')
    .get(async (req, res) => {
        let searchTerm = xss(req.params.searchTerm);

        try {
            searchTerm = validation.checkString(searchTerm, "Username");
        } catch (error) {
            return res.status(400).json({error: error});
        }

        try {
            const users = await userData.getUserByUsernamePartial(searchTerm);
            console.log(users);
            return res.render('searchResults', {
                results: users,
                noResults: false,
                isMovieSearch: false
            });
        } catch (error) {
            res.render('searchResults', {
                noResults: true
            });
        }
    });

export default router;