var express = require('express');
var router = express.Router();
var unirest = require('unirest')
// var passport = require('passport');
var knex = require('../db/knex');
var db_Data_Stores = require('../db/tbl_data_stores');

var Queue_List = {};

unirest.get('http://localhost:8080/api/stores/Queue').end( function(data) {
    for (var i = 0; i < data.body.length; i++) {
      Queue_List[data.body[i].id] = [];
    }
  })

router.get('/status', function(req, res){
  res.send(Queue_List);
})

router.post('/:queueID/enqueue', function(req, res){
  Queue_List[req.params.queueID].push(req.body.message)
  res.send(Queue_List);
})

router.get('/:queueID/dequeue', function(req, res){
  var message = Queue_List[req.params.queueID].pop()
  res.send(message);
})

router.delete('/:queueID/purge', function(req, res){
  Queue_List[req.params.queueID] = []
  res.send(Queue_List);
})

module.exports = router;
