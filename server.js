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
