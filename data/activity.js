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
  updateTrending(newLogInfo.insertedId.toString(), date, "add");
  return await getLogById(newLogInfo.insertedId.toString());
};

// Get an activity log by its _id
const getLogById = async (activityId) => {
  console.log(`Activity id is ${activityId}`)

  activityId = validation.checkId(activityId, "Activity ID");
  const logs = await activity();
  console.log(logs)
  console.log("#########################")
  const log = await logs.findOne({ _id: new ObjectId(activityId) });
  console.log("#########################")
  console.log(log)
  if (!log) throw "Error: activity not found";
  return log;
};

const gettopLogs = async () => {
  // console.log("Check 1")
 const logs = await activity();
//  console.log("Check 2")
 const all = await logs.find({}).limit(5).toArray();
 //console.log(all)
//  console.log("Check 3 !!")
 return all;
};

// Get all activity logs for a given username
const getLogsByUserId = async (userId) => {
  // need to add check here from user data functions to see if user exists?
  const logs = await activity();
  let userLogs = await logs.find({ userId: userId }).toArray();
  return userLogs;
};

const getAllLogs = async () => {
  const logs = await activity();
  const all = await logs.find({}).toArray();
  return all;
};

// Edit an activity log
const editLog = async (activityId, movieId, userId, review, rating, date) => {
  console.log("inside edit log")
  // console.log(activityId);
  validation.checkProvided(activityId, review, rating, date);
  activityId = validation.checkId(activityId, "Activity ID");

  review = validation.checkString(review, "Review");

  //rating = validation.checkRating(rating, "Rating");
  
  //date = validation.checkDate(date, "Date");


  //movieId = validation.checkMovieId(movieId, "Movie ID");
  //userId = validation.checkId(userId, "User ID");

  const activities = await activity();
  // console.log(activities)
  const log = await getLogById(activityId);
  console.log("log$$$$$$$$")
  
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
    updateTrending(activityId, oldDate, "delete");
    updateTrending(activityId, newDate, "add");
  }
  //call updatetrening function in trending.js to update the trending once implemented
  return updatedLog.value;
};

const deleteLog = async (activityId) => {
  activityId = validation.checkId(activityId, "Activity ID");
  const logs = await activity();
  const deleteDate = await logs.findOne({ _id: new ObjectId(activityId) });
  // console.log(deleteDate.date);
  const deletedLog = await logs.findOneAndDelete({
    _id: new ObjectId(activityId),
  });
  if (deletedLog.lastErrorObject.n === 0)
    throw "Error: could not delete activity";
  updateTrending(activityId, deleteDate, "delete");
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
  gettopLogs
};
