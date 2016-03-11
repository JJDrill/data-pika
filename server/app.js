var Express = require("express")
var Socket = require("socket.io")
var http = require("http")
var bodyParser = require('body-parser');
var projects = require('./routes/projects');
var data_stores = require('./routes/data_stores');
var queues = require('./routes/queues');
var metrics = require('./routes/metrics');

var db_Projects = require('./db/tbl_projects');
var db_Data_Stores = require('./db/tbl_data_stores');
var db_Store_Metrics = require('./db/tbl_store_metrics');

var app = Express()
var server = http.Server(app)
var io = Socket(server)

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(Express.static("./client"))
app.use('/api/projects', projects);
app.use('/api/stores', data_stores);
app.use('/api/queues', queues);
app.use('/api/metrics', metrics);

db_Projects.Get_Projects().then(function(projects){
  for (var i = 0; i < projects.length; i++) {
    Start_Metrics_Channel(projects[i].Name);
  }
})

var Start_Metrics_Channel = function(project_name){
  var channelName = project_name.replace(' ', '_')
  var nsp = io.of(channelName);

  nsp.on("connection", function (socket){
    console.log('Creating metric channel: ', channelName);

    var intervalParam = setInterval(function () {
      db_Store_Metrics.Get_Project_Metrics(project_name).then(function(data){
        socket.emit("metrics", data)
      })
    }, 2000)

    socket.on("disconnect", function(){
      clearInterval(intervalParam);
      console.log('Client disconnected...');
    })
  })
}

server.listen(8080, function () {
  console.log("listening on 8080")
})
