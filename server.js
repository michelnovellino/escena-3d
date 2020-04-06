var express = require('express');
var app = express();
var path = require('path');
app.use('/app', express.static(__dirname + '/app'));
app.use('/framework', express.static(__dirname + '/framework'));
app.use('/assets', express.static(__dirname + '/assets'));
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    console.log(__dirname )
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);