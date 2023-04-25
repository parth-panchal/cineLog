import * as activity from "../data/activity.js";
import * as trending from "../data/trending.js";

export default async function main() {
    console.log("================================= Activity Seeding ================================="); 

    try {
    let newLog = await activity.createLog(
        550,
        "parthpanchal",
        "This is a review",
        5,
        "06/06/2021"
    );
    if (newLog) console.log("log added");
    } catch (e) {
    console.log(e);
    }
    try {
    let newLog = await activity.createLog(
        550,
        "parthpanchal",
        "This is a review",
        5,
        "06/09/2021"
    );
    if (newLog) console.log("log added");
    } catch (e) {
    console.log(e);
    }
    try {
    let newLog = await activity.createLog(
        550,
        "parthpanchal",
        "This is a review",
        5,
        "06/06/2021"
    );
    if (newLog) console.log("log added");
    } catch (e) {
    console.log(e);
    }
    try {
    let newLog = await activity.createLog(
        0, //this is the case I was talking about. This messes with axios badly. It just throws the entire error body that is returned from the server.
        "parthpanchal",
        "This is a review",
        5,
        "06/06/2021"
    );
    if (newLog) console.log("log added");
    } catch (e) {
    console.log(e);
    }
    try {
    let parth = await activity.getAllLogs();
    } catch (e) {
    console.log(e);
    }
    try {
    } catch (e) {
    console.log(e);
    }
    try {
    let result = await trending.calculateTrending();
    console.log(result);
    } catch (e) {
    console.log(e);
    }
}