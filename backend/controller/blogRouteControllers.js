const Blog = require("../model/blogModel")
const asyncHandler = require("express-async-handler");

// @desc Getting all the blogs
// @route GET /blogs
// @access public

const getBlogs = asyncHandler (async (req, res, next) => {
    const blogs = await Blog.find();
    if(!blogs) {
        res.status(404);
        next(new Error("No blogs found!!"))
    }

    res.json(blogs)
})

// @desc Getting a single blog
// @route GET /blogs
// @access public

const getBlogById = asyncHandler (async (req, res, next) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if(!blog) {
        res.status(404);
        next(new Error("Not Found!!"))
    }
    res.json(blog);
})

// @desc Getting a users all blog
// @route GET /blogs
// @access private

const getUserBlogs = asyncHandler(async (req, res, next) => {
    const usrId = req.params.id;
    const blogs = await Blog.find({userId: usrId});
    if(!blogs) {
        res.status(404);
        return next(new Error("No Blog Found for the user!"));
    }

    res.json(blogs);
})



// @desc Save a blog on the database
// @route POST /create-blog
// @access private

const saveBlog = asyncHandler (async (req, res, next) => {
    const {title, content} = req.body;

    if(!title || !content) {
        res.status(404);
        return next(new Error("Either title or content is missing!!"));
    }

    // check if the blog with same title already exist

    const findBlog = await Blog.findOne({title});
    if(findBlog) {
        return next(new Error("Blog with same title alreayd exist!"));
    }

    const blog = await Blog.create({title, content, userId: req.user.id, username: req.user.username});


    if(!blog) {
        res.status(400);
        return next(new Error("Database error!"))
    }
    res.json({title: "successfully saved!"})
})

// @desc edit the already existing blogs
// @route PUT /edit-blog
// @access private

const editBlog = asyncHandler( async (req, res, next) => {
    const id = req.params.id;

     // first check that the req.user.id and userId of blog are same
    // for that first we need to fetch the blog

    const checkBlog = await Blog.findById(id);

    // checking if the user have created the blog or not
    if(req.user.id !== checkBlog.userId) {
        res.status(401);
        return next(new Error("Not authorized to edit!!"));
    }

    const {title, content} = req.body;
    if(!title || !content) {
        res.status(404);
        return next(new Error("Either title or content is missing!!"));
    }

    // updating the content of the blog
    const blog = await Blog.findByIdAndUpdate(id, {title, content}, {new: true});

    if(!blog) {
        res.status(400);
        return next(new Error("Database error!"))
    }
    res.json({title: "successfully saved!"})
})

const deleteBlog = asyncHandler (async (req, res, next) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if(!blog) {
        res.status(404);
        return next(new Error("Blog does not exist!"));
    }

    if(req.user.id !== blog.userId) {
        res.status(401);
        return next(new Error("Not an authorized user to delete the blog!"))
    }

    await blog.deleteOne();

    res.status(200).json({"message": "Blog deleted!"})
})

module.exports = {getBlogs, getBlogById, saveBlog, editBlog, getUserBlogs, deleteBlog};
