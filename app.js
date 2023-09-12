const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const jwt = require("jsonwebtoken");
const config = require("./config");
const errorHandler = require("./middleware/errorHandler");
const postRoutes = require("./routes/post");
const categoryRoutes = require("./routes/category");
const directoryRoutes = require("./routes/directory");
const bannerRoutes = require("./routes/banner");
const eventsRoutes = require("./routes/events");
const adsRoutes = require("./routes/ads");
const headeradsRoutes = require("./routes/headerAds");
const mediaRoutes = require("./routes/media");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, PATCH, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Access-Control-Allow-Origin, Access-Control-Expose-Headers"
  );
  next();
});

// Connect to MongoDB
mongoose
  .connect(config.mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "iuZeL0LrnkO5K$edr3RWD!S!q",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 36000000, //3600000ms = 1hr
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Use middleware

// Error handling middleware
app.use(errorHandler);

// Use routes
app.use("/api/post", postRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/directory", directoryRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/headerads", headeradsRoutes);
app.use("/api/mainads", adsRoutes);
app.use("/api/banner", bannerRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
