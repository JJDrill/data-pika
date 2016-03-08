var express = require('express');
var router = express.Router();
// var passport = require('passport');
var knex = require('../db/knex');
var db_Groups = require('../db/tbl_project_groups');

router.post('/', function(req, res){
  db_Groups.Add_Group(req.body.project_name, req.body.group_name)
    .then(function(result){
    res.send(result);
  })
})

router.get('/', function(req, res){
  db_Groups.Get_Groups().then(function(result){
    res.send(result);
  })
})

router.get('/:id', function(req, res){
  db_Groups.Get_Groups_For_Project(req.params.id).then(function(result){
    res.send(result);
  })
})

router.delete('/:id', function(req, res){
  db_Groups.Delete_Group(req.params.id).then(function(result){
    res.sendStatus(result);
  })
})

module.exports = router;
