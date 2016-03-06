var Express = require("express")
var Socket = require("socket.io")
var http = require("http")
var unirest = require('unirest')
// var db = require('monk')('localhost/realState')
var bodyParser = require('body-parser');
var projects = require('./routes/projects');

var app = Express()
var server = http.Server(app)
var io = Socket(server)

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(Express.static("./client"))
app.use('/api/projects', projects);

// app.get('/api/projects', function (request, response) {
  // unirest.get('https://still-journey-81768.herokuapp.com/')
  //   .end(function (data) {
  //     Promise.all(
  //       data.body.map(function (house) {
  //         return db.get('houses').insert(house)
  //       })
  //     ).then(function (result) {
  //       response.json(data.body)
  //     })
  //   })
  // response.send("Test")
// })

// io.on("connection", function (socket) {
//   setInterval(function () {
//     unirest.get('https://still-journey-81768.herokuapp.com/')  // This is the call to the static data
//       .end(function (data) {
//         db.get('houses').find().then(function (houses) {
//           // var average = reduceFindAverage(houses);
//           var average = findAverage(houses);
//           socket.emit("bid", {
//             body: data.body,
//             average: average,
//             time: new Date()
//           })
//         })
//       })
//   }, 3000)
// })

server.listen(8080, function () {
  console.log("listening on 8080")
})
