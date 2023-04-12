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
    const createTendingObject = async (date,activityId) => {
        date = validation.checkDate(date, "Date");
        activityId = validation.checkId(activityId, "Activity ID");

        const isTheGivenDatePresent = await trending.findOne({ date });

        if(isTheGivenDatePresent){
            await trending.updateOne(
                { _id: isTheGivenDatePresent._id },
                { $addToSet: { activityIds: activityId } }
            )
        }

        else {
            await trending.insertOne({ date, activityIds: [activityId] });
        }
        // let trendingObject = { 
        //     date: date,
        //     activityIds: activityId
        // };
    }    
    const getActivityIdsForDate = async(date) => {
        /* Implement your logic here to retrieve the list of activity IDs
        for the given date from your data source */
    }