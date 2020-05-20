//need to get access to the file. fs is the file system
const fs = require('fs')
const bodyParser = require("body-parser")

const express = require('express')
const router = express.Router()

const cors = require("cors")
router.use(cors())

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json())

const grades = JSON.parse(fs.readFileSync("grades.JSON"))


/*Get Grades-returns a list of all grades*/ 
router.get('/', (req, res) => res.send(grades))


//GET grades/:studentId - returns all grades for a given student by student id
router.get('/:id', (req, res) => res.json(grades.filter(grade => grade.id === +req.params.id)))
  
  
//POST grade - records a new grade, returns success status in JSON response (meaning you do not need to actually store the grade in a database. 
//You do need to validate that the user supplied at least a grade, and a studentId)
router.post('/',(req,res) =>{
    let result;
    const newGrades = req.body;
    if(newGrades.id && newGrades.grade){
        grades.push({ id: newGrades.id, grade: newGrades.grade, class: newGrades.class })

        result = {
            "status": "success",
            "message": "The grade has been successfully added"
        }
    }else{
        result = {
            "status": "failed",
            "message": "The grade has not been added"
        }
        res.status(400);
    }

    res.send(result);
});

module.exports = router