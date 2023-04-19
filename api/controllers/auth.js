const db = require("../db.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
    // check existing email and username
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.username], (err, data)=>{
        if(err){
            console.log(err);
        }
        if(data.length)return res.status(409).json("USER ALREADy EXITS");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);    
        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";

        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(q, [values], (err, data)=>{
            if(err){
                console.log(err);
                return res.json(err);
            }else{
                return res.status(200).json("user has been created");
            }
        })
    })

}
const login = async (req, res) => {
  
    const q = "SELECT * FROM users Where users.username = ?";
  
    try {
      const data = await new Promise((resolve, reject) => {
        db.query(q, [req.body.username], (err, data) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(data);
        });
      });
      
      if (data.length == 0) {
        return res.status(404).json("User not found");
      }
  
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (isPasswordCorrect) {
        // this is userinfo as id
        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const { password, ...other } = data[0];
        
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(other);
      } else return res.status(400).json("Wrong username or password");
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  };
const logout = (req, res) => {
    // console.log("logout started")
    res.clearCookie("access_token",{
      sameSite: "none",
      secure: true
    }).status(200).json("user has been logged out");
}
const temp = (req, res) => {
  console.log("temp tata")
}

module.exports.register = register;
module.exports.login = login;
module.exports.logout = logout;