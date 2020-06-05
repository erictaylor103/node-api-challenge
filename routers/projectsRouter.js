const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');
const router = express.Router();


//GET all projects
router.get('/', function(req, res){
    Projects.get(res.body)
    .then(project => {
        console.log(project);
        res.status(200).json(project);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The Projects information could not be retrieved" })
        
    })
});







module.exports = router;