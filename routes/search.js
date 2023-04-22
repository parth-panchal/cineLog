import { Router } from "express";
import xss from "xss";
import { userData } from "../data/index.js";
import * as validation from "../utils/validation.js";

const router = Router();

router
    .route('/movies')
    .get(async (req, res) => {
        // Return the search results of the movie title

    })
    .post(async (req, res) => {
        // When the user searches for a movie title, it would make a request here
        // Makes API Call
        // Redirects to get route with info if valid

    });

router
    .route('/users')
    .get(async (req, res) => {

    })
    .post(async (req, res) => {
        // When the user searches for a user, it would make a request here
        // Makes DB call, searchByUsername
        // Redirects to get route with info if valid

    });

export default router;