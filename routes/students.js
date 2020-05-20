const express = require('express')
const router = express.Router()

//need to get access to the file. fs is the file system
const fs = require('fs')

const students = JSON.parse(fs.readFileSync('students.json'))


//GET students - returns a list of all students
router.get('/', (req, res) => {
    if(!req.query.search){
        res.send(students)
    }
    else{
        //GET student?search= - returns a list of students filtered on name matching the given query
        const filteredStudents = students.filter(student => student.name.includes(req.query.search))
        res.send(filteredStudents)
    }
    
})

 // GET students/:studentId - returns details of a specific student by student id
router.get('/:id', (req, res) => {
    const selectedStudent = students.find(student => student.id === Number(req.params.id))
    res.send(selectedStudent)
});



module.exports = router