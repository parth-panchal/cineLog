// create trending object for each new date
// update trending object for each activity change (addition/deletion) if date already exists
// delete activity id from array of trending object for each deleted activity

import { trending } from "../config/mongoCollections.js";
import { getMovieByActivityId } from "../utils/helper.js";

const updateTrending = async (activityId, date, action) => {
  const trendingData = await trending();
  if (action === "add") {
    const existingTrend = await trendingData.findOne({ date: date });
    if (!existingTrend) {
      let addition = await trendingData.insertOne({
        date: date,
        activityIds: [activityId],
      });
    } else
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
    if (deletedTrend.value.activityIds.length === 0)
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
  let answer = Object.entries(movieDict).sort((a, b) => b[1] - a[1]);
  let sortedMovieDict = {};
  answer.forEach((item) => {
    sortedMovieDict[item[0]] = item[1];
  });
  return sortedMovieDict;
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
