//statistics data functions

//1. total number of movies watched
//2. total number of movies watched by year
//3. total hours of movies watched
//4. most genre watched
//5. most actor watched
//6. most director watched
//7. average rating given to movies watched
//8. favorite decade of movies to watch

//can add more functions if needed

import { activity } from "../config/mongoCollections.js";
import * as helper from "../utils/helper.js";
import * as validation from "../utils/validation.js";

const getTotalMoviesWatched = async (userId) => {
  const logs = await activity();
  const allLogs = await logs.find({ userId: userId }).toArray();
  let total = allLogs.length;
  return total;
};

const getTotalMoviesWatchedYear = async (userId, year) => {
  if (typeof year !== "number") throw "Error: year must be a number";
  const allLogs = await activity();
  const logs = await allLogs.find({ userId: userId }).toArray();
  let count = 0;
  logs.forEach((log) => {
    if (helper.getYearFromDateString(log.date) == year) count++;
  });
  return count;
};

const getTotalHoursWatched = async (userId) => {
  const allLogs = await activity();
  const logs = await allLogs.find({ userId: userId }).toArray();
  let sum = await logs.reduce(async (previousPromise, log) => {
    let totalHours = await previousPromise;
    let movieHours = await helper.getMovieRuntime(log.movieId);
    console.log(`Movie Hour: ${movieHours}`);
    return totalHours + movieHours;
  }, Promise.resolve(0));
  return await sum;
};

const getMostGenreWatched = async (userId) => {
  const allLogs = await activity();
  const logs = await allLogs.find({ userId: userId }).toArray();
  let all = await logs.reduce(async (previousPromise, log) => {
    let allGenres = await previousPromise;
    let movieGenres = await helper.getMovieGenres(log.movieId);
    return allGenres.concat(movieGenres);
  }, Promise.resolve([]));
  let counts = {};
  let maxCount = 0;
  let mostCommonGenre = null;
  for (let i = 0; i < all.length; i++) {
    let genre = all[i];
    counts[genre.name] = (counts[genre.name] || 0) + 1;
    if (counts[genre.name] > maxCount) {
      maxCount = counts[genre.name];
      mostCommonGenre = genre;
    }
  }
  return mostCommonGenre;
};

const getMostWatchedActor = async (userId) => {
  let allLogs = await activity();
  let logs = await allLogs.find({ userId: userId }).toArray();
  let allActors = await logs.reduce(async (previousPromise, log) => {
    let all = await previousPromise;
    let movieActors = await helper.getMovieCast(log.movieId);
    return all.concat(movieActors);
  }, Promise.resolve([]));
  let actorCounts = {};
  allActors.forEach((actor) => {
    if (actor.known_for_department == "Acting")
      actorCounts[actor.name] = (actorCounts[actor.name] || 0) + 1;
  });
  console.log(actorCounts);
  let sortedActorCounts = Object.keys(actorCounts).sort((a, b) => {
    return actorCounts[b] - actorCounts[a];
  });
  return sortedActorCounts[0];
};

const getMostWatchedDirector = async (userId) => {
  let allLogs = await activity();
  let logs = await allLogs.find({ userId: userId }).toArray();
  let allCrew = await logs.reduce(async (previousPromise, log) => {
    let all = await previousPromise;
    let movieCrew = await helper.getMovieCrew(log.movieId);
    return all.concat(movieCrew);
  }, Promise.resolve([]));
  let directorCounts = {};
  allCrew.forEach((member) => {
    if (member.job == "Director")
      directorCounts[member.name] = (directorCounts[member.name] || 0) + 1;
  });
  let sortedDirectorCounts = Object.keys(directorCounts).sort((a, b) => {
    return directorCounts[b] - directorCounts[a];
  });
  return sortedDirectorCounts[0];
};

const getAverageRatingByUser = async (userId) => {
  let allLogs = await activity();
  let logs = await allLogs.find({ userId: userId }).toArray();
  let totalRating = 0;
  let count = 0;
  logs.forEach((log) => {
    count++;
    totalRating += log.rating;
  });
  return totalRating / count;
};

const getFavoriteDecade = async (userId) => {
  let allLogs = await activity();
  let logs = await allLogs.find({ userId: userId }).toArray();
  let allYears = await logs.reduce(async (previousPromise, log) => {
    let allYears = await previousPromise;
    let movieYear = await helper.getMovieReleaseYear(log.movieId);
    return allYears.concat(movieYear);
  }, Promise.resolve([]));
  let decades = {};
  allYears.forEach((year) => {
    let decade = Math.floor(year / 10) * 10;
    decades[decade] = (decades[decade] || 0) + 1;
  });
  return Object.keys(decades).reduce((a, b) =>
    decades[a] > decades[b] ? a : b
  );
};

export {
  getTotalHoursWatched,
  getTotalMoviesWatched,
  getTotalMoviesWatchedYear,
  getMostWatchedActor,
  getMostWatchedDirector,
  getMostGenreWatched,
  getAverageRatingByUser,
  getFavoriteDecade,
};
