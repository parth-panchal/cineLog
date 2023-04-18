// create activity - used by /movie/:id
// view activity - used by profile/username/activity and /activity/:id
// edit activity - used by /activity/:id
// delete activity - used by /activity/:id, also call update function in trending.js

import { activity } from "../config/mongoCollections.js";
import { trending } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as validation from "../utils/validation.js";

const createLog = async (movieId, userId, review, rating, date) => {
  validation.checkProvided(movieId, userId, review, rating);
<<<<<<< HEAD
  movieId = await validation.checkMovieId(movieId, "Movie ID");
=======
  movieId = validation.checkMovieId(movieId, "Movie ID");
>>>>>>> 735291434543a244055c2e3d18dd0d0f7264af22
  userId = validation.checkId(userId, "User ID"); // need to add check here from user data functions to see if user exists?
  review = validation.checkString(review, "Review");
  rating = validation.checkRating(rating, "Rating");
  date = validation.checkDate(date, "Date");

  let newLog = {
    movieId: movieId,
    userId: userId,
    review: review,
    rating: rating,
    date: date,
  };

  const logs = await activity();
  const newLogInfo = await logs.insertOne(newLog);

  if (!newLogInfo.insertedId || !newLogInfo.acknowledged)
    throw "Error: could not add activity";
  return await getLogById(newLogInfo.insertedId.toString());
};

// Get an activity log by its _id
const getLogById = async (activityId) => {
  activityId = validation.checkId(activityId, "Activity ID");
  const logs = await activity();
  const log = await logs.findOne({ _id: new ObjectId(activityId) });
  if (!log) throw "Error: activity not found";
  return log;
};

// Get all activity logs for a given username
const getLogsByUserId = async (userId) => {
  // need to add check here from user data functions to see if user exists?
  const logs = await activity();
  return await logs.find({ _id: new ObjectId(userId) }).toArray();
};

const getAllLogs = async () => {
  const logs = await activity();
  const all = await logs.find({}).toArray();
  return all;
};

// Edit an activity log
const editLog = async (activityId, movieId, userId, review, rating, date) => {
  validation.checkProvided(activityId, movieId, userId, review, rating, date);
  activityId = validation.checkId(activityId, "Activity ID");
  movieId = validation.checkMovieId(movieId, "Movie ID");
  userId = validation.checkId(userId, "User ID");
  review = validation.checkString(review, "Review");
  rating = validation.checkRating(rating, "Rating");
  date = validation.checkDate(date, "Date");
  const activities = await activity();
  const log = await getLogById(activityId);

  const update = {
    movieId: movieId,
    review: review,
    rating: rating,
    date: date,
  };
  let hasChanges = false;
  if (
    update.movieId !== log.movieId ||
    update.review !== log.review ||
    update.rating !== log.rating ||
    update.date !== log.date
  )
    hasChanges = true;
  if (!hasChanges) throw "Error: no changes made";
  const updatedLog = await activities.findOneAndReplace(
    { _id: new ObjectId(activityId) },
    update,
    { returnDocument: "after" }
  );
  if (updatedLog.lastErrorObject.n === 0)
    throw "Error: could not update activity";
  //call updatetrening function in trending.js to update the trending once implemented
  return updatedLog.value;
};

const deleteLog = async (activityId) => {
  activityId = validation.checkId(activityId, "Activity ID");
  const logs = await activity();
  const deletedLog = await logs.findOneAndDelete({
    _id: new ObjectId(activityId),
  });
  if (deletedLog.lastErrorObject.n === 0)
    throw "Error: could not delete activity";
  //call updatetrening function in trending.js to update the trending once implemented
  return { activityId: activityId, deleted: true }; // will change the return object later based on requirements
};

export {
  createLog,
  getLogsByUserId,
  getLogById,
  getAllLogs,
  editLog,
  deleteLog,
};
