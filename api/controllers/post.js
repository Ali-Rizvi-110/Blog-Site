const jwt = require("jsonwebtoken")
const db = require("../db.js")

const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE category = ?" : "SELECT * FROM posts"
    db.query(q, [req.query.cat], (err, data)=>{
        if(err)return res.send(err)
        return res.status(200).json(data)
    })
}
const getPost = (req, res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `category`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"
    db.query(q, [req.params.id], (err, data)=>{ 
        if(err)return res.status(500).send(err);
        return res.status(200).json(data[0])
    })
}
const addPost = (req, res) => {
    const token = req.cookies.access_token
    if(!token)return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err)return res.status(403).json("Token is not valid!")

        const q = "INSERT INTO posts(`title`, `desc`, `img`, `category`, `date`, `uid`) VALUES (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]

        db.query(q, [values], (err, data)=>{
            if(err){
                console.log(err)
                return res.status(500).json(err)
            }else{
                return res.json("Post has been created")
            }
        })

    })
}
const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token)return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err)return res.status(403).json("Token is not valid!")

        const postId = req.params.id
        const q = "SELECT * FROM posts WHERE `id` = ? AND uid = ?";

        db.query(q, [postId, userInfo.id], (err, data)=>{
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            if (data.length === 0) {
                return res.status(404).json({ error: "Post not found" });
            }
            if (data[0].uid !== userInfo.id) {
                return res.status(403).json({ error: "You can delete only your posts" });
            }
            // Delete the post from the database
            const deleteQ = "DELETE FROM posts WHERE id = ?";
            db.query(deleteQ, [postId], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Internal server error" });
                }
                return res.json("Post has been deleted");
            });
        });
    })
}
const updatePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated")
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")

        const q = "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `category` = ? WHERE `id` = ? AND `uid` = ?"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat
        ]
        const postID = req.params.id;
        db.query(q, [...values, postID, userInfo.id], (err, data)=>{
            if(err){
                console.log(err)
                return res.status(500).json(err)
            } else {
                console.log("success in update!!")
                return res.json({ message: "Post has been updated" })
            }
        })
    })
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    deletePost,
    updatePost
}