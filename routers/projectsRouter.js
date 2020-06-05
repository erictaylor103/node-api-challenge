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

//GET projects by id

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Projects.get(id)
    .then(project => {
      console.log(project);
      res.status(201).json(project);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve resource' });
    });
});





module.exports = router;