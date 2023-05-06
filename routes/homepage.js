import Router from "express";
const router = Router();

router.get("/", async (req, res) => {
  let isAuthenticated = req.session.user ? true : false;

  res.render("homepage", {
    isAuthenticated: isAuthenticated
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

export default router;
