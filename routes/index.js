import activityRoutes from "./activity.js";
import homepageRoutes from "./homepage.js";
import listsRoutes from "./lists.js";
import loginRoutes from "./login.js";
import movieRoutes from "./movie.js";
import profileRoutes from "./profile.js";
import searchRoutes from "./search.js";
import signupRoutes from "./signup.js";
import userRoutes from "./user.js";

const constructorMethod = (app) => {
    app.use('/', homepageRoutes);
    app.use('/search', searchRoutes);
    app.use('/login', loginRoutes);
    app.use('/signup', signupRoutes);
    app.use('/profile', profileRoutes);
    app.use('/activity', activityRoutes);
    app.use('/list', listsRoutes);
    app.use('/movie', movieRoutes);
    app.use('/user', userRoutes);

    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

export default constructorMethod;