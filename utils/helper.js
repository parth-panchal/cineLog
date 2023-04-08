import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://api.themoviedb.org/3';

const params = {
	language: 'en-US',
	include_adult: false,
	page: 1,
	api_key: process.env.API_KEY
};

const searchMovie = async (movieTitle) => {
	const endpoint = '/search/movie';

	params.query = movieTitle;
	const { data } = await axios.get(BASE_URL + endpoint, { params });
	delete params.query;

	return data;
};

const getMovieInfo = async (movieId) => {
	const endpoint = `/movie/${movieId}`;

	const { data } = await axios.get(BASE_URL + endpoint, { params });

	return data;
};

const getRecommendations = async (movieId) => {
	const endpoint = `/movie/${movieId}/recommendations`;

	const { data } = await axios.get(BASE_URL + endpoint, { params });

	return data;
};

export {
	searchMovie,
	getMovieInfo,
	getRecommendations
}