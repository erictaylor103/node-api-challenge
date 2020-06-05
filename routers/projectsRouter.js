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

//GET an action by project id - sub route

router.get('/:id/actions', validateProjectId, (req, res) => {

    Projects.getProjectActions(req.params.id)
    .then(project => {
        console.log(project);
        res.status(201).json(project);
      }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Unable to retrieve the actions' });
      });
})


//POST - add a project

router.post('/', (req, res) => {        
    Projects.insert(req.body).then(project => {
        console.log(project);
        res.status(201).json(project);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Unable to retrieve resource' });
    });
})

//POST add project action - add an action to a project by referencing the project id
//localhost:5000/projects/projectid/actions
router.post('/:id/actions', validateProjectId, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        console.log(action);
        res.status(201).json(action);
      }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Unable to get the created action' });
      });
})

//PUT - update a project by id
//localhost:5000/projects/PROJECTID
router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    Projects.update(id, updates).then(updated => {
      res.status(200).json(updated);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "The user information could not be modified." });
    });
});


//DELETE an project by it's id

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id).then(deleted => {
      console.log('Project deleted:', deleted);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The project was not deleted" });
    });
});


// custom middleware
//VAlidateProjectID

function validateProjectId(req, res, next) {
    const { id } = req.params;

    Projects.get(id)
    .then(project => {
      console.log('project', project);
      if( Object.keys(project).length == 0){
        res.status(400).json({ message: "invalid project id" });
      }else next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: `Couldn't retrieve a project with id: ${id}` });
    });
}

module.exports = router;