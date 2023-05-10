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
    console.log("================================= Follower Seeding =================================");
    try {
        let result = await userData.updateUserFollowing(parshId, parthId, "add");
        if(result) console.log(`User added to following for: ${parshUsername}`);
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
}