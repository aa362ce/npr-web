// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const exec = require('child_process').exec;

//var command ="docker run -it --rm -v $(pwd):/data:ro openalpr -c eu -j *.jpg";
const command = "docker run -t --rm -v " + __dirname + "/uploads:/data:ro openalpr -c eu -j ";

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

app.use('/fileupload', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = __dirname + '/uploads/' + files.filetoupload.name;
    var c2 = command + files.filetoupload.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      exec(c2, function (error, stdout, stderr) {
        if (error) {
          res.write("Error analyzing the file.");
          res.end();
          return;
        }
        // break the textblock into an array of lines
        var lines = stdout.split('\n');
        // remove one line, starting at the first position
        lines.splice(0, 1);
        // join the array back into a single string
        var newtext = lines.join('\n');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(newtext);
        res.end();
      });
    });
  });
})

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));







/** 







var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var exec = require('child_process').exec;

//var command ="docker run -it --rm -v $(pwd):/data:ro openalpr -c eu -j *.jpg";
var command ="docker run -t --rm -v "+ __dirname+"/uploads:/data:ro openalpr -c eu -j ";

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = __dirname+'/uploads/' + files.filetoupload.name;
      var c2 = command + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        exec(c2, function(error, stdout, stderr){
          res.write(stdout);
          //res.write(error);
          res.write(stderr);
          if(error){
            res.write("Error analyzing the file.");
            res.end();
            return;
          }
          res.write('File uploaded and moved!');
          res.end();
        });
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);

console.log("Server started @ http://localhost:8080/")

**/
