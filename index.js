const express = require ('express');
const path = require('path');
const mongoose = require('mongoose');
const Project = require('./models/projectModel')
const ejsMate = require('ejs-mate');

mongoose.connect('mongodb://localhost:27017/ProjectMaker');

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() =>{
    console.log("Database connected");
});


const app = express();

app.set('views', path.join(__dirname,'views'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));


app.get('/', (req, res) => {
    res.render('noteMaker/start')
});
app.get('/start', (req, res) => {
    res.render('noteMaker/start');
});
app.get('/signUp', (req, res) => {
    res.render('noteMaker/signUp')
});
app.get('/pricing', (req, res) => {
    res.render('noteMaker/pricing')
});
app.get('/login', (req, res) => {
    res.render('noteMaker/login')
});
app.get('/home', async (req, res) => {
     res.render('noteMaker/home')
    // const project = new Project({title:"sdasd", description:"jdnfdjsan",minimmuDays:"5" });
    // await project.save();
    // res.render('noteMaker/showProject')
});


app.get('/projects', async (req, res) => {
    const allProjects = await Project.find({});
    res.render('noteMaker/allProjects',{allProjects})
});

app.get('/projects/new', (req, res) => {
    res.render('noteMaker/new');
});
app.post('/projects', async (req, res) => {
        
    const project = new Project(req.body.project);
    await project.save();
    res.redirect(`/projects/${project._id}`);
       
// res.send(req.body);
});

app.get('/projects/:id',async (req,res)=> {
    const project = await Project.findById(req.params.id)
    res.render('noteMaker/show',{project})
})

app.get('/projects/:id/edit', async(req, res) => {
    const project = await Project.findById(req.params.id)
    res.render('noteMaker/show',{project})
});

app.listen(8080, () => {
    console.log(`Server started on port 8080`);
});
