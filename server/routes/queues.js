var express = require('express');
var router = express.Router();
var unirest = require('unirest')
// var passport = require('passport');
var knex = require('../db/knex');
var db_Data_Stores = require('../db/tbl_data_stores');
var db_Metrics = require('../db/tbl_store_metrics');

var Queue_List = {};

unirest.get('http://localhost:8080/api/stores/Queue').end( function(data) {
    for (var i = 0; i < data.body.length; i++) {
      Queue_List[data.body[i].id] = [];
      db_Data_Stores.Update_Depth(data.body[i].id, 0)
    }
  })

router.get('/status', function(req, res){
  res.send(Queue_List)
})

router.post('/:queueID/enqueue', function(req, res){
  Queue_List[req.params.queueID].push(req.body.message)
  res.send(Queue_List)

  db_Data_Stores.Update_Depth(req.params.queueID, Queue_List[req.params.queueID].length)

  db_Metrics.Submit_Metrics({
    Data_Store_ID: req.params.queueID,
    Date_Time: new Date(),
    Activity_Name: "Enqueue",
    Activity_Value: 1
  })
})

router.get('/:queueID/dequeue', function(req, res){
  var message = Queue_List[req.params.queueID].pop()
  res.send(message)

  db_Data_Stores.Update_Depth(req.params.id, Queue_List[req.params.queueID].length)

  db_Metrics.Submit_Metrics({
    Data_Store_ID: req.params.queueID,
    Date_Time: new Date(),
    Activity_Name: "Dequeue",
    Activity_Value: 1
  })
})

router.delete('/:queueID/purge', function(req, res){
  Queue_List[req.params.queueID] = []
  res.send(Queue_List)

  db_Data_Stores.Update_Depth(req.params.id, Queue_List[req.params.queueID].length)

  db_Metrics.Submit_Metrics({
    Data_Store_ID: req.params.queueID,
    Date_Time: new Date(),
    Activity_Name: "Purge",
    Activity_Value: 1
  })
})

module.exports = router;
