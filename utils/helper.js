import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://api.themoviedb.org/3";

const params = {
  language: "en-US",
  include_adult: false,
  page: 1,
  api_key: process.env.API_KEY,
};

/*
Given movieTitle: String
Calls TheMovieDB API endpoint to search for a movie name
Returns data: Object, contains array with movies matching (or similar) to movieTitle
*/
const searchMovie = async (movieTitle) => {
  const endpoint = "/search/movie";

  params.query = movieTitle;
  const { data } = await axios.get(BASE_URL + endpoint, { params });
  delete params.query;

  return data;
};

/*
Given movieId: int
Calls TheMovieDB API endpoint to search for movie info
Returns data: Object, contains movie information fields
*/
const getMovieInfo = async (movieId) => {
  const endpoint = `/movie/${movieId}`;

	try {
		const { data } = await axios.get(BASE_URL + endpoint, { params });
		return data;
	} catch (error) {
		// console.log(error);
		throw "Error: Movie not found";
	}
};

/*
Given movieId: int
Calls TheMovieDB API endpoint to get recommendations
Returns data: Object, contains array with movies relevant to movieTitle
*/
const getRecommendations = async (movieId) => {
  const endpoint = `/movie/${movieId}/recommendations`;

  const { data } = await axios.get(BASE_URL + endpoint, { params });

  return data;
};

/*
We will require a function which gets the userID from the current session so that's something we need to figure out in the future
*/

export { searchMovie, getMovieInfo, getRecommendations };
