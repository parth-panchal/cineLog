// create trending object for each new date
// update trending object for each activity change (addition/deletion) if date already exists
// delete activity id from array of trending object for each deleted activity

import { trending } from "../config/mongoCollections.js";
import { activity } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import * as validation from "../utils/validation.js";


/*We are going to add only the id into activity.js as well The structure of the object there is going to be
    trendingObject = {
      date: 'string',
      activityIds:[Array of acticity IDs]
    }

    Here we will be adding on what date what activityid was logged into our application
  */
    export const createTendingObject = async (date,activityId) => {
        date = validation.checkDate(date, "Date");
        //activityId = validation.checkId(activityId, "Activity ID");
        const logs = await trending();

        const isTheGivenDatePresent = await logs.findOne({ date : date});

        let trendingObject = { 
            date: date,
            activityIds: activityId
         };
        let trendingVal=undefined
        if(isTheGivenDatePresent){
            trendingVal = await logs.updateOne(
                { _id: isTheGivenDatePresent._id },
                { $addToSet: { activityIds: activityId } }
            )
            return trendingVal;
        }

        else {
            trendingVal = await logs.insertOne(trendingObject);
            return trendingVal;
        }
         
    }    
    const getActivityIdsForDate = async(date) => {
        /* Implement your logic here to retrieve the list of activity IDs
        for the given date from your data source */
    } 