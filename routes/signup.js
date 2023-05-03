import { Router } from "express";
const router = Router();
// import { listData } from "../data/index.js";
import * as userData from "../data/users.js";
import * as validation from "../utils/validation.js";

router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    return res.render("signup", { title: "Signup Page" });
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      let firstName = req.body.firstNameInput;
      let lastName = req.body.lastNameInput;
      let username = req.body.usernameInput;
      let password = req.body.passwordInput;
      let confirmPassword = req.body.confirmPasswordInput;
      if (
        !firstName ||
        !lastName ||
        !username ||
        !password ||
        !confirmPassword
      ) {
        throw { code: 400, message: "Some fields are missing" };
      }
      try {
        firstName = validation.checkName(firstName, "First Name");
      } catch (e) {
        throw { code: 400, message: e };
      }
      try {
        lastName = validation.checkName(lastName, "Last Name");
      } catch (e) {
        throw { code: 400, message: e };
      }
      try {
        username = validation.checkUsername(username);
      } catch (e) {
        throw { code: 400, message: e };
      }
      try {
        password = validation.checkPassword(password, "Password");
      } catch (e) {
        throw { code: 400, message: e };
      }
      if (password !== confirmPassword) {
        throw { code: 400, message: "passwords do not match" };
      }

      const user = await userData.createUser(firstName, lastName, username, password);
      if (!user) {
        throw { code: 400, message: "User could not be created!" };
      }
      res.redirect("/login");
    } catch (e) {
      res.status(e.code || 400).render("error", {
        error: e.message || "Error!",
      });
    }
  });

export default router;
