var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(express.json());
app.set('port', process.env.port || 8000)
var cors = require('cors')
app.use(cors())

const studentsRouter = require('./routes/students')
const gradesRouter = require('./routes/grades')
const registerRouter = require('./routes/register')

app.use('/students', studentsRouter) 
app.use('/grades', gradesRouter)
app.use('/register', registerRouter)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('welcome to the app')
})

app.listen(app.get('port'), () => console.log(`listening on port ${app.get('port')}`))

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  


module.exports = app;
