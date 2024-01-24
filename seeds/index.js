const mongoose = require('mongoose');
const Project = require('../models/projectModel')

const ProjectSeeds = require('./projectsSeeds');

mongoose.connect('mongodb://localhost:27017/ProjectMaker');

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() =>{
    console.log("Database connected");
});
const date = new Date();
const [day,month,year] = [date.getDate(),date.getMonth(),date.getFullYear()];
console.log(`${day}-${month}-${year}`)
const seedDB = async ()=>{
       await Project.deleteMany({});
//     const p = new Project({title:"Notepad"});
//     await p.save();
        for(let i=0;i<10;i++){
            const rand = Math.floor(Math.random() *10);
        
        const p = new Project({
            title: `${ProjectSeeds[rand].title}`,
            description: `${ProjectSeeds[rand].description}`,
            lastDate: `${day}-${month}-${year}`
        });
        await p.save();
    }
 }

seedDB().then(() =>{

    mongoose.connection.close();
    console.log('database closed')

})