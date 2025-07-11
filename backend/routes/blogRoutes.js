const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authorizationHandler");
const {getBlogs, getUserBlogs ,getBlogById, saveBlog, editBlog, deleteBlog} = require("../controller/blogRouteControllers");
const { verify } = require("jsonwebtoken");

router.get("/blogs",getBlogs);
router.get("/user/blogs/:id", verifyToken, getUserBlogs)
router.get("/blogs/:id", getBlogById);
router.post("/create-blog/", verifyToken, saveBlog);
router.route("/edit-blog/:id").put(verifyToken ,editBlog);
router.delete("/delete/:id", verifyToken ,deleteBlog);
module.exports = router;
