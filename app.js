// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(session({
    secret: 'NotMyAge',
    saveUninitialized: false, 
    resave: false, 
    cookie: {
        maxAge: 1000*60*60*24// is in milliseconds.  expiring in 1 day
    },
    store: new MongoStore({
    mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/Recyclup",
      ttl: 60*60*24, // is in seconds. expiring in 1 day
    })
}));

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const itemRoutes = require('./routes/items.routes');
app.use('/api', itemRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

const profileRoutes = require('./routes/profile.routes');
app.use('/api', profileRoutes);
//ALL SERVER SIDE ROUTES START WITH/API

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
