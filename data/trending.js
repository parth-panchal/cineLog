// create trending object for each new date
// update trending object for each activity change (addition/deletion) if date already exists
// delete activity id from array of trending object for each deleted activity

import { trending } from "../config/mongoCollections.js";
import { getMovieByActivityId } from "../utils/helper.js";

const updateTrending = async (activityId, date, action) => {
  const trendingData = await trending();
  if (action === "add") {
    const existingTrend = await trendingData.findOne({ date: date });
    if (!existingTrend)
      await trendingData.insertOne({
        date: date,
        activityIds: [activityId],
      });
    else
      await trendingData.findOneAndUpdate(
        { date: date },
        { $push: { activityIds: activityId } },
        { returnDocument: "after" }
      );
  } else if (action === "delete") {
    let deletedTrend = await trendingData.findOneAndUpdate(
      { date: date },
      { $pull: { activityIds: activityId } },
      { returnDocument: "after" }
    );
    if (deletedTrend.activityIds.length === 0)
      await trendingData.deleteOne({ date: date });
  }
};

//all-time trending
const calculateTrending = async () => {
  const trendingData = await trending();
  const trendingInfo = await trendingData.find({}).toArray();
  let allActivityIds = [];
  trendingInfo.forEach((trend) => {
    allActivityIds = allActivityIds.concat(trend.activityIds);
  });
  let movieDict = {};
  for (let i = 0; i < allActivityIds.length; i++) {
    const activityId = allActivityIds[i];
    const movieId = await getMovieByActivityId(activityId);
    if (movieDict[movieId]) movieDict[movieId]++;
    else movieDict[movieId] = 1;
  }
  return movieDict;
};

//trending for a specific date
const calculateTrendingForDate = async (date) => {
  const trendingData = await trending();
  const trendingInfo = await trendingData.findOne({ date: date });
  let movieDict = {};
  for (let i = 0; i < trendingInfo.activityIds.length; i++) {
    const activityId = trendingInfo.activityIds[i];
    const movieId = await getMovieByActivityId(activityId);
    if (movieDict[movieId]) movieDict[movieId]++;
    else movieDict[movieId] = 1;
  }
  return movieDict;
};

export { updateTrending, calculateTrending, calculateTrendingForDate };

import { trending } from "../config/mongoCollections.js";
import { getMovieByActivityId } from "../utils/helper.js";

const updateTrending = async (activityId, date, action) => {
  const trendingData = await trending();
  if (action === "add") {
    const existingTrend = await trendingData.findOne({ date: date });
    if (!existingTrend)
      await trendingData.insertOne({
        date: date,
        activityIds: [activityId],
      });
    else
      await trendingData.findOneAndUpdate(
        { date: date },
        { $push: { activityIds: activityId } },
        { returnDocument: "after" }
      );
  } else if (action === "delete") {
    let deletedTrend = await trendingData.findOneAndUpdate(
      { date: date },
      { $pull: { activityIds: activityId } },
      { returnDocument: "after" }
    );
    if (deletedTrend.activityIds.length === 0)
      await trendingData.deleteOne({ date: date });
  }
};

//all-time trending
const calculateTrending = async () => {
  const trendingData = await trending();
  const trendingInfo = await trendingData.find({}).toArray();
  let allActivityIds = [];
  trendingInfo.forEach((trend) => {
    allActivityIds = allActivityIds.concat(trend.activityIds);
  });
  let movieDict = {};
  for (let i = 0; i < allActivityIds.length; i++) {
    const activityId = allActivityIds[i];
    const movieId = await getMovieByActivityId(activityId);
    if (movieDict[movieId]) movieDict[movieId]++;
    else movieDict[movieId] = 1;
  }
  return movieDict;
};

//trending for a specific date
const calculateTrendingForDate = async (date) => {
  const trendingData = await trending();
  const trendingInfo = await trendingData.findOne({ date: date });
  let movieDict = {};
  for (let i = 0; i < trendingInfo.activityIds.length; i++) {
    const activityId = trendingInfo.activityIds[i];
    const movieId = await getMovieByActivityId(activityId);
    if (movieDict[movieId]) movieDict[movieId]++;
    else movieDict[movieId] = 1;
  }
  return movieDict;
};

export { updateTrending, calculateTrending, calculateTrendingForDate };

// import { trending } from "../config/mongoCollections.js";
// import { activity } from "../config/mongoCollections.js";
// import { ObjectId } from "mongodb";
// import * as validation from "../utils/validation.js";


// /*We are going to add only the id into activity.js as well The structure of the object there is going to be
//     trendingObject = {
//       date: 'string',
//       activityIds:[Array of acticity IDs]
//     }

//     Here we will be adding on what date what activityid was logged into our application
//   */
//     const createTendingObject = async (date,activityId) => {
//         date = validation.checkDate(date, "Date");
//         activityId = validation.checkId(activityId, "Activity ID");

//         const isTheGivenDatePresent = await trending.findOne({ date });

//         if(isTheGivenDatePresent){
//             await trending.updateOne(
//                 { _id: isTheGivenDatePresent._id },
//                 { $addToSet: { activityIds: activityId } }
//             )
//         }

//         else {
//             await trending.insertOne({ date, activityIds: [activityId] });
//         }
//         // let trendingObject = { 
//         //     date: date,
//         //     activityIds: activityId
//         // };
//     }    
//     const getActivityIdsForDate = async(date) => {
//         /* Implement your logic here to retrieve the list of activity IDs
//         for the given date from your data source */
//     }