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







module.exports = router;