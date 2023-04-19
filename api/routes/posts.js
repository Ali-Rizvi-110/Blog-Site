const express = require("express");
const { addPost, deletePost, updatePost, getPost, getPosts } = require("../controllers/post.js");

const router = express.Router()

router.get("/", getPosts)
router.get("/:id",getPost)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)

module.exports = router;