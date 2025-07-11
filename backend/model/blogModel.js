const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: String,
    content: String,
    userId: String,
    username: String
})

module.exports = mongoose.model("Blog", blogSchema);
