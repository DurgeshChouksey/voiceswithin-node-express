const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv").config();
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/connectDb");

// database connection
connectDB();

const app = express();
const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// endpoints
app.use("/", blogRoutes);
app.use("/", userRoutes);

// error handler middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log("server is running on port " + process.env.PORT);
});
