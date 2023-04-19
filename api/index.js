const express = require("express");
const cors = require("cors");
const multer = require("multer");

const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const cookieParser = require("cookie-parser");

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
})
  
const upload = multer({ storage })


app.post('/upload', upload.single('file'), function (req, res, next){
    console.log('uploading')

    try{
      console.log(req.file)
      return res.status(200).json({filename: req.file.filename, message: "has been uploaded"});
    }catch(err){
      console.log(err);
      return res.json(err);
    }
})


app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/test", (req, res)=>{
    res.send("it works");
})

app.listen(8800, ()=>{
    console.log("Connect to port 8800");
})