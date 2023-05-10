import { ObjectId } from "mongodb";
import { userData, activityData, listData } from "../data/index.js";

export default async function main() {
    let parshId, parthId, atharId, jayanId, timId, mikeId,
        gregId, mayId, patId, lisaId, natId, kimId,
        chrisId, monId, lukeId = "";
    let parshUsername, parthUsername, atharUsername, jayanUsername, timUsername, mikeUsername,
        gregUsername, mayUsername, patUsername, lisaUsername, natUsername, kimUsername,
        chrisUsername, monUsername, lukeUsername = "";

    console.log("================================= User Seeding =================================");
    try {
        let newUser = await userData.createUser(
          "Parshotan",
          "Seenanan",
          "ParshSee",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        parshId = newUser._id;
        parshUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }
    
    try {
        let newUser = await userData.createUser(
          "Parth",
          "Panchal",
          "ParthPan",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        parthId = newUser._id;
        parthUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Atharva",
          "Parte",
          "ArtharPar",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        atharId = newUser._id;
        atharUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Jayanth",
          "Dannana",
          "JayanDan",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        jayanId = newUser._id;
        jayanUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Timothy",
          "Sweeny",
          "TimSwee",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        timId = newUser._id;
        timUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Mike",
          "Trout",
          "MiTrout",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        mikeId = newUser._id;
        mikeUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Greg",
          "Heffley",
          "GregHeff",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        gregId = newUser._id;
        gregUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "May",
          "Valentine",
          "mayVal",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        mayId = newUser._id;
        mayUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Patrick",
          "Hill",
          "PatHill",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        patId = newUser._id;
        patUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    
    try {
        let newUser = await userData.createUser(
          "Lisa",
          "Turner",
          "LisaTurn",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        lisaId = newUser._id;
        lisaUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Natasha",
          "Winters",
          "NatWin",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        natId = newUser._id;
        natUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Kim",
          "Possible",
          "kimPoss",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        kimId = newUser._id;
        kimUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Chris",
          "Pratt",
          "chrisPratt",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        chrisId = newUser._id;
        chrisUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Monica",
          "Washington",
          "monWash",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        monId = newUser._id;
        monUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    try {
        let newUser = await userData.createUser(
          "Luke",
          "Brian",
          "lukeBri",
          "testPass1!"
        );
        if (newUser) console.log(`User: ${newUser.username} created`);
        lukeId = newUser._id;
        lukeUsername = newUser.username;
    } catch (error) {
        console.log(error);
    }

    console.log("================================= Activity Seeding =================================");
    try {
        let newLog = await activityData.createLog(
            550,
            parshId,
            "This is a review",
            5,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${parshUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            551,
            parshId,
            "Eh",
            1.5,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${parshUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            550,
            parshId,
            "Ok, not bad",
            3,
            "2021-05-02"
        );
        if (newLog) console.log(`Activity added for: ${parshUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            10093,
            parshId,
            "Don't recommend",
            1,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${parshUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            550,
            parthId,
            "Why was this made? Ew",
            1,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${parthUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            553,
            jayanId,
            "This is a review",
            5,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${jayanUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            550,
            jayanId,
            "This is a review as well!",
            4.5,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${jayanUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            550,
            jayanId,
            "This is another reivew for the same movie!",
            5,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${jayanUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            10093,
            timId,
            "This is a review as well!",
            1.5,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${timUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            554,
            timId,
            "This is a review as well!",
            2,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${timUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            554,
            mikeId,
            "This is a review as well!",
            2,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${mikeUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            554,
            mikeId,
            "This is a review as well!",
            2,
            "2021-06-06"
        );
        if (newLog) console.log(`Activity added for: ${mikeUsername}`);
    } catch (e) {
        console.log(e);
    }


    try {
        let newLog = await activityData.createLog(
            34186,
            lisaId,
            "movie very good",
            5,
            "2021-12-28"
        );
        if (newLog) console.log(`Activity added for: ${lisaUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            30794,
            lisaId,
            "movie",
            3,
            "2021-10-28"
        );
        if (newLog) console.log(`Activity added for: ${lisaUsername}`);
    } catch (e) {
        console.log(e);
    }


    try {
        let newLog = await activityData.createLog(
            34186,
            natId,
            "Good movie",
            4,
            "2018-01-28"
        );
        if (newLog) console.log(`Activity added for: ${natUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            438590,
            natId,
            "Bad movie",
            1,
            "2019-01-28"
        );
        if (newLog) console.log(`Activity added for: ${natUsername}`);
    } catch (e) {
        console.log(e);
    }


    try {
        let newLog = await activityData.createLog(
            438590,
            kimId,
            "Great movie review",
            4,
            "2022-01-28"
        );
        if (newLog) console.log(`Activity added for: ${kimUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            34186,
            kimId,
            "Great movie review again",
            5,
            "2022-01-10"
        );
        if (newLog) console.log(`Activity added for: ${kimUsername}`);
    } catch (e) {
        console.log(e);
    }


    try {
        let newLog = await activityData.createLog(
            438590,
            chrisId,
            "Atharva P review again",
            5,
            "2022-12-10"
        );
        if (newLog) console.log(`Activity added for: ${chrisUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            34186,
            chrisId,
            "Atharva P review",
            5,
            "2021-12-06"
        );
        if (newLog) console.log(`Activity added for: ${chrisUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            852046,
            monId,
            "This is a review and its ugh",
            1,
            "2021-10-06"
        );
        if (newLog) console.log(`Activity added for: ${monUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            852046,
            monId,
            "This is a review and its bad",
            2,
            "2022-02-06"
        );
        if (newLog) console.log(`Activity added for: ${monUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            852046,
            atharId,
            "This is a review and its nice",
            3,
            "2021-02-06"
        );
        if (newLog) console.log(`Activity added for: ${atharUsername}`);
    } catch (e) {
        console.log(e);
    }

    try {
        let newLog = await activityData.createLog(
            119441,
            atharId,
            "This is a review and its nice",
            5,
            "2021-01-06"
        );
        if (newLog) console.log(`Activity added for: ${atharUsername}`);
    } catch (e) {
        console.log(e);
    }

    //



    console.log("================================= Watchlist Seeding =================================");
    try {
        let result = await userData.updateUserWatchlist(parshId, 341, "add");
        if(result) console.log(`Movie added to watchlist for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserWatchlist(parshId, 550, "add");
        if(result) console.log(`Movie added to watchlist for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserWatchlist(kimId, 550, "add");
        if(result) console.log(`Movie added to watchlist for: ${kimUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserWatchlist(monId, 550, "add");
        if(result) console.log(`Movie added to watchlist for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserWatchlist(gregId, 550, "add");
        if(result) console.log(`Movie added to watchlist for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserWatchlist(kimId, 341, "add");
        if(result) console.log(`Movie added to watchlist for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    console.log("================================= Likes Seeding =================================");
    try {
        let result = await userData.updateUserLikes(parshId, 341, "add");
        if(result) console.log(`Movie added to likes for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(parshId, 550, "add");
        if(result) console.log(`Movie added to likes for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(jayanId, 341, "add");
        if(result) console.log(`Movie added to likes for: ${jayanUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(parthId, 550, "add");
        if(result) console.log(`Movie added to likes for: ${parthUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(lisaId, 341, "add");
        if(result) console.log(`Movie added to likes for: ${lisaUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(gregId, 550, "add");
        if(result) console.log(`Movie added to likes for: ${gregUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(monId, 341, "add");
        if(result) console.log(`Movie added to likes for: ${monUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(monId, 550, "add");
        if(result) console.log(`Movie added to likes for: ${monUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(kimId, 341, "add");
        if(result) console.log(`Movie added to likes for: ${kimUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(timId, 550, "add");
        if(result) console.log(`Movie added to likes for: ${timUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(timId, 341, "add");
        if(result) console.log(`Movie added to likes for: ${timUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserLikes(chrisId, 550, "add");
        if(result) console.log(`Movie added to likes for: ${chrisUsername}`);
    } catch (error) {
        console.log(error);
    }

    console.log("================================= Follower Seeding =================================");
    try {
        let result = await userData.updateUserFollowing(parshId, parthId, "add");
        if(result) console.log(`User added to following for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserFollowing(jayanId, parshId, "add");
        if(result) console.log(`User added to following for: ${jayanUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserFollowing(patId, kimId, "add");
        if(result) console.log(`User added to following for: ${patUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserFollowing(kimId, parthId, "add");
        if(result) console.log(`User added to following for: ${kimUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserFollowing(parshId, timId, "add");
        if(result) console.log(`User added to following for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserFollowing(timId, lisaId, "add");
        if(result) console.log(`User added to following for: ${timUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserFollowing(jayanId, gregId, "add");
        if(result) console.log(`User added to following for: ${jayanUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserFollowing(chrisId, monId, "add");
        if(result) console.log(`User added to following for: ${chrisUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await userData.updateUserFollowing(chrisId, mayId, "add");
        if(result) console.log(`User added to following for: ${chrisUsername}`);
    } catch (error) {
        console.log(error);
    }

    console.log("================================= List Seeding =================================");
    try {
        let result = await listData.createList(parshId, "Best Movies of 2023", [550, 551, 552]);
        if(result) console.log(`List created for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await listData.createList(parshId, "Best Movies of 2022", [550, 551, 552]);
        if(result) console.log(`List created for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await listData.createList(mayId, "Anime", [550, 551, 552]);
        if(result) console.log(`List created for: ${mayUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await listData.createList(timId, "My List", [550, 551, 552]);
        if(result) console.log(`List created for: ${timUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await listData.createList(gregId, "Anime", [550, 551, 552]);
        if(result) console.log(`List created for: ${gregUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await listData.createList(parthId, "My Waifus", [550, 551, 552]);
        if(result) console.log(`List created for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    try {
        let result = await listData.createList(mayId, "Anime 2014", [550, 551, 552]);
        if(result) console.log(`List created for: ${parshUsername}`);
    } catch (error) {
        console.log(error);
    }

    console.log("=================================");
    console.log(`Note: 3 Users ${atharUsername} - ${lukeUsername} - ${natUsername} are blank accounts with no activity/watchlist/likes/lists/followers
Note: All users have the same password for simple testing purposes`);
    console.log("================================="); 
}