//statistics data functions

//1. total number of movies watched
//2. total hours of movies watched
//3. most genre watched
//4. most actor watched
//5. most director watched
//6. average rating given to movies watched
//7. favorite decade of movies to watch

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

const getTotalTimeWatched = async (userId) => {
  const allLogs = await activity();
  const logs = await allLogs.find({ userId: userId }).toArray();
  let sum = await logs.reduce(async (previousPromise, log) => {
    let totalHours = await previousPromise;
    let movieHours = await helper.getMovieRuntime(log.movieId);
    return totalHours + movieHours;
  }, Promise.resolve(0));
  //convert to hours and minutes
  let hours = Math.floor(sum / 60);
  let minutes = sum % 60;
  let totalTime = { hours: hours, minutes: minutes };
  return `${totalTime.hours} hours, ${totalTime.minutes} minutes`;
};

const getMostWatchedGenre = async (userId) => {
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
  return mostCommonGenre.name;
};

const getMostWatchedMovie = async (userId) => {
  let allLogs = await activity();
  let logs = await allLogs.find({ userId: userId }).toArray();
  let all = await logs.reduce(async (previousPromise, log) => {
    let allMovies = await previousPromise;
    let movie = await helper.getMovieInfo(log.movieId);
    return allMovies.concat(movie);
  }, Promise.resolve([]));
  //count movie which has most logs
  let counts = {};
  let maxCount = 0;
  let mostWatchedMovie = null;
  for (let i = 0; i < all.length; i++) {
    let movie = all[i];
    counts[movie.original_title] = (counts[movie.original_title] || 0) + 1;
    if (counts[movie.original_title] > maxCount) {
      maxCount = counts[movie.original_title];
      mostWatchedMovie = movie.original_title;
    }
  }
  return mostWatchedMovie;
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
  let decade = Object.keys(decades).reduce((a, b) =>
    decades[a] > decades[b] ? a : b
  );
  return `${decade}s`;
};

const allStats = async (userId) => {
  userId = validation.checkId(userId);
  let allLogs = await activity();
  let logs = await allLogs.find({ userId: userId }).toArray();
  if (logs.length == 0) return null;
  let totalMoviesWatched = await getTotalMoviesWatched(userId);
  let totalTimeWatched = await getTotalTimeWatched(userId);
  let mostWatchedMovie = await getMostWatchedMovie(userId);
  let mostWatchedGenre = await getMostWatchedGenre(userId);
  let mostWatchedActor = await getMostWatchedActor(userId);
  let mostWatchedDirector = await getMostWatchedDirector(userId);
  let averageRatingByUser = await getAverageRatingByUser(userId);
  let favoriteDecade = await getFavoriteDecade(userId);

  return {
    totalMoviesWatched,
    totalTimeWatched,
    mostWatchedMovie,
    mostWatchedGenre,
    mostWatchedActor,
    mostWatchedDirector,
    averageRatingByUser,
    favoriteDecade,
  };
};

export { allStats };
