//need to get access to the file. fs is the file system
const fs = require('fs')
const bodyParser = require("body-parser")

const express = require('express')
const router = express.Router()

const cors = require("cors")
router.use(cors())

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json())

const register = JSON.parse(fs.readFileSync("users.JSON"))

  
//POST register - creates a new user, returns success status in JSON response (meaning you do not need to actually store the user info in a database. 
//You do need to validate that the user supplied username and email)
router.post('/', (req, res) =>{
    let result; 
    const user = {username: req.body.username, password:req.body.password};
    if(user.username && user.password){
       register.push(user)

       result = {
        "status": "success",
        "message": "User has been created"
        }

    }else{
        result = {
        "status": "failed",
        "message": "User has not been created"
        }
        res.status(400);
    }
    res.json(result);
});

module.exports = router