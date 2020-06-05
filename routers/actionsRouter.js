const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const router = express.Router();


//GET all actions

router.get('/', function(req, res){
    
    Actions.get(res.body)
    .then(actions => {
        console.log(actions);
        res.status(200).json(actions);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "Could not get actions" })
        
    })
})


//GET actions by id
router.get('/:id', function(req, res){
    const {id} = req.params;
    Actions.get(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json( {error: "Unable to get action by id"} );
    })
    
})

//PUT - update an action by id
//localhost:5000/actions/project_id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Actions.update(id, changes).then(updated => {
      res.status(200).json(updated);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "The user information could not be modified." });
    });
});

//DELETE an action by it's id

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id).then(deleted => {
      console.log('Desintegrated:', deleted);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Action not deleted" });
    });
});

// custom middleware

function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
    .then(action => {
      console.log('action', action);
      if( Object.keys(action).length == 0){
        res.status(400).json({ message: "Enter an id" });
      }else next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: `Can't find an action with the id of: ${id}` });
    });
}

module.exports = router;