// create activity - used by /movie/:id
// view activity - used by profile/username/activity and /activity/:id
// edit activity - used by /activity/:id
// delete activity - used by /activity/:id, also call update function in trending.js

import { activity } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as validation from "../utils/validation.js";
import { updateTrending } from "./trending.js";

const createLog = async (movieId, userId, review, rating, date) => {
  validation.checkProvided(movieId, userId, review, rating, date);
  movieId = await validation.checkMovieId(movieId, "Movie ID");
  userId = validation.checkId(userId, "User ID");
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
  await updateTrending(newLogInfo.insertedId.toString(), date, "add");
  return await getLogById(newLogInfo.insertedId.toString());
};

// Get an activity log by its _id
const getLogById = async (activityId) => {
  activityId = validation.checkId(activityId, "Activity ID");
  activityId = activityId.toString();
  const logs = await activity();
  const log = await logs.findOne({ _id: new ObjectId(activityId) });
  if (!log) throw "Error: activity not found";
  return log;
};


// Get all activity logs for a given username
const getLogsByUserId = async (userId) => {
  const logs = await activity();
  let userLogs = await logs.find({ userId: userId }).toArray();
  return userLogs;
};

const getLogsByMovieId = async (movieId) => {
  validation.checkProvided("Movie ID", movieId);
  movieId = await validation.checkMovieId(movieId);

  const activityCollection = await activity();
  let activityArr = await activityCollection.find({ 
    movieId: movieId
  }).toArray();

  activityArr = activityArr.map((activity) => {
    activity._id = activity._id.toString();
    return activity;
  });

  return activityArr;
}

const getAllLogs = async () => {
  const logs = await activity();
  const all = await logs.find({}).toArray();
  return all;
};

// Edit an activity log
const editLog = async (activityId, movieId, userId, review, rating, date) => {
  validation.checkProvided(activityId, review, rating, date);
  activityId = validation.checkId(activityId, "Activity ID");

  review = validation.checkString(review, "Review");

  rating = validation.checkRating(rating, "Rating");
  
  date = validation.checkDate(date, "Date");

  movieId = validation.checkMovieId(movieId, "Movie ID");
  userId = validation.checkId(userId, "User ID");

  const activities = await activity(); 
  const log = await getLogById(activityId);
  
  const update = {
    movieId: movieId,
    userId: userId,
    review: review,
    rating: rating,
    date: date,
  };
  let hasChanges = false;
  if (
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
  let oldDate = log.date;
  let newDate = date;
  if (oldDate !== newDate) {
    await updateTrending(activityId, oldDate, "delete");
    await updateTrending(activityId, newDate, "add");
  }
  return updatedLog.value;
};

const deleteLog = async (activityId) => {
  activityId = validation.checkId(activityId, "Activity ID");
  const logs = await activity();
  const deleteDate = await logs.findOne({ _id: new ObjectId(activityId) });
  const deletedLog = await logs.findOneAndDelete({
    _id: new ObjectId(activityId),
  });
  if (deletedLog.lastErrorObject.n === 0)
    throw "Error: could not delete activity";
  await updateTrending(activityId, deleteDate.date, "delete");
  return { activityId: activityId, deleted: true }; 
};

export {
  createLog,
  getLogsByUserId,
  getLogById,
  getLogsByMovieId,
  getAllLogs,
  editLog,
  deleteLog
};