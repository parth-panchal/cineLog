import * as lists from "../data/lists.js";
import * as users from "../data/users.js";

export default async function main() {
    console.log("================================= Lists Seeding ================================");
    let userId = "";
    let listId = "";
    let list2Id = "";

    try {
    let newUser = await users.createUser(
        "Jayanth",
        "Dannana",
        "jDannana",
        "testPass1!"
    );
    if (newUser) console.log("User created 1");
    userId = newUser._id;
    } catch (error) {
    console.log(error);
    }

    try {
    let list1 = await lists.createList(
        userId,
        "Best movies of 2022",
        [ 555, 51, 233, 108]
    );
    listId = list1._id;
    if (list1) console.log("log added");
    } catch (e) {
    console.log(e);
    }
    try {
    let list2 = await lists.createList(
        userId,
        "Best movies of 2025",
        [ 555, 51, 233, 108]
    );
    list2Id = list2._id;
    if (list2) console.log("log added");
    } catch (e) {
    console.log(e);
    }
    try {
    let k = await lists.getAllLists(userId);
    console.log(k);
    } catch (e) {
    console.log(e);
    }
    try {
    let k = await lists.getListById(listId);
    console.log(k);
    } catch (e) {
    console.log(e);
    }
    try {
    let k = await lists.deleteList(listId);
    console.log(k);
    } catch (e) {
    console.log(e);
    }
    // This function is throwing UnhandledPromiseRejection error
    // Need to look into it
    try {
    let k = await lists.updateList(list2Id, "Best Movies of 2024", [108, 9, 6, 16, 8]);
    console.log(k)
    } catch (e) {
    console.log(e)
    }
}