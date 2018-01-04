var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render("index");
})

app.post('/results', function(req, res) {
  console.log("POST DATA", req.body);
  res.render("results", { data:req.body });
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);

  socket.on( "form", function (data){
    console.log(data.values)
    var random = Math.floor(Math.random() * 1000) + 1
    socket.emit( 'update_message', {submited:  data.values, ex: 'hi'});
    socket.emit( 'random_number', {random: random});
  })
})
