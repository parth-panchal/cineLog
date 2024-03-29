import axios from "axios";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { activity } from "../config/mongoCollections.js";
import { checkMovieId } from "./validation.js";
import { userData } from "../data/index.js";
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
  params.page = 1;
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

const getMovieByActivityId = async (activityId) => {
  const logs = await activity();
  const log = await logs.findOne(
    { _id: new ObjectId(activityId) },
    { movieId: 1 }
  );
  if (!log) throw "Error: activity not found";
  return log.movieId;
};

const getRecommendationsByMovieId = async (movieId) => {
  const endpoint = `/movie/${movieId}/recommendations`;
  const { data } = await axios.get(BASE_URL + endpoint, { params });
  if (data.total_pages > 1)
    // Get recommendations from all pages
    for (let i = 2; i <= data.total_pages; i++) {
      params.page = i;
      const { data: newData } = await axios.get(BASE_URL + endpoint, {
        params,
      });
      data.results = data.results.concat(newData.results);
    }
  params.page = 1;
  return data.results; //array of objects returned
};

const getYearFromDateString = (dateString) => {
  return dateString.split("/")[2];
};

const getMovieRuntime = async (movieId) => {
  checkMovieId(movieId);
  const endpoint = `/movie/${movieId}`;
  const { data } = await axios.get(BASE_URL + endpoint, { params });
  return data.runtime;
};

const getMovieGenres = async (movieId) => {
  await getMovieInfo(movieId);
  const endpoint = `/movie/${movieId}`;
  const { data } = await axios.get(BASE_URL + endpoint, { params });
  return data.genres;
};

const getMovieReleaseYear = async (movieId) => {
  await getMovieInfo(movieId);
  const endpoint = `/movie/${movieId}`;
  const { data } = await axios.get(BASE_URL + endpoint, { params });
  return data.release_date.split("-")[0];
};

const getMovieCast = async (movieId) => {
  const endpoint = `/movie/${movieId}/credits`;
  try {
    const { data } = await axios.get(BASE_URL + endpoint, { params });
    return data.cast;
  } catch (e) {
    console.log(e);
  }
};

const getMovieCrew = async (movieId) => {
  const endpoint = `/movie/${movieId}/credits`;
  try {
    const { data } = await axios.get(BASE_URL + endpoint, { params });
    return data.crew;
  } catch (e) {
    console.log(e);
  }
};

const calculateMovieStats = (movieActivity) => {
  const returnObj = {};

  returnObj.timesWatched = movieActivity.length;

  const average =
    movieActivity.reduce((acc, obj) => {
      return acc + obj.rating;
    }, 0) / movieActivity.length;
  const averageRoundOne = Math.floor(average * 10) / 10;

  if (isNaN(averageRoundOne)) {
    returnObj.averageRating = "Not Yet Rated";
  } else {
    returnObj.averageRating = averageRoundOne;
  }
  returnObj.reviews = movieActivity.map((activity) => activity.review);

  return returnObj;
};

const transformInfo = async (givenArr, type, isActivity) => {
  let responseArr = [];

  responseArr = givenArr.reduce(async (previousPromise, currVal) => {
    let tempArr = await previousPromise;
    let infoCall;
    if (type === "movieInfo" && isActivity) {
      infoCall = await getMovieInfo(currVal.movieId);
      currVal.movieTitle = infoCall.title;
      return tempArr.concat(currVal);
    } else if (type === "movieInfo" && !isActivity) {
      infoCall = await getMovieInfo(currVal);
    } else if (type === "userInfo") {
      infoCall = await userData.getUserById(currVal);
    }
    return tempArr.concat(infoCall);
  }, Promise.resolve([]));

  return responseArr;
};

export {
  searchMovie,
  getMovieInfo,
  getRecommendations,
  getMovieByActivityId,
  getRecommendationsByMovieId,
  getYearFromDateString,
  getMovieRuntime,
  getMovieGenres,
  getMovieReleaseYear,
  getMovieCast,
  getMovieCrew,
  calculateMovieStats,
  transformInfo,
};
