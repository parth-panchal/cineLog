import { Router } from "express";
const router = Router();
// import { listData } from "../data/index.js";
import * as userData from "../data/users.js";
import * as validation from "../utils/validation.js";

router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    return res.render("login", { title: "Login Page" });
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      let username = req.body.usernameInput;
      let password = req.body.passwordInput;

      try {
        username = validation.checkUsername(username);
        password = validation.checkPassword(password, "Password");
      } catch (e) {
        throw { code: 400, message: e };
      }

      const user = await userData.checkUser(email, password);

      if (!user) {
        throw { code: 400, message: "User could not be authenticated!" };
      }
      // console.log(user);

      req.session.user = user;
      res.cookie("AuthCookie", req.session.user);

      return res.redirect(req.session.returnTo || "/");
    } catch (e) {
      return res.status(e.code || 400).render("login", {
        title: "Login",
        error:
          e.message || "Error! did not provide valid email address or password",
      });
    }
  });
export default router;
