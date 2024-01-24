const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: String,
    lastDate: String,
    description: String,
    
});

module.exports = mongoose.model('Project', ProjectSchema)