const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
    github_username: String,
    name: String,
    avatar_url: String,
    bio: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

//Criando o esquema dentro do BD
module.exports = mongoose.model('Dev', DevSchema);