const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');

const mkdirp = require('mkdirp');
var cors=require('cors');
// default options
app.use(fileUpload());
app.use(cors());
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

/*app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});*/
/* 
app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});
 */

//=================================================================================================================
//Code fetching all the files in a directory
//=================================================================================================================
app.get('/downloadall/:lcnoval', function(req, res) {

	var val = {};

    lcnoval = req.params.lcnoval;

    var dirname = __dirname+'/'+lcnoval+'/';

	console.log("dirname--->",dirname);

	var filenames = fs.readdirSync(dirname);

	console.log("dir --->",filenames);

	for( var i = 0; i < filenames.length; i++ ) {

	var file = filenames[i];

	val[i] = fs.readFileSync(dirname  + file);
	}

  console.log("val----",val);



   for( var j = 0; j < val.length; j++ ) {

	var resval = val[j];

	res.header("Access-Control-Allow-Origin", "*");
	res.send(resval);

	}
  //require(dirname+"/"+file);


   //res.writeHead(200, {'Content-Type': 'image/jpg' });

   // res.end(img, 'binary');

});
//=================================================================================================================
// Download the file by giving file name
//=================================================================================================================

 app.get('/download/:lcno/:file', function(req, res) {

    file = req.params.file;
	lcno = req.params.lcno;

    var dirname = __dirname+'/'+lcno+'/';

    var img = fs.readFileSync(dirname  + file);

	res.header("Access-Control-Allow-Origin", "*");
	res.send(img);

    //res.writeHead(200, {'Content-Type': 'image/jpg' });

   // res.end(img, 'binary');

});

//=================================================================================================================
// Get all the uploaded files
//=================================================================================================================
  app.get('/getfilenames/:lcno', function(req, res) {

  lcno = req.params.lcno;

  const testFolder = __dirname +'/'+lcno;

  fs.readdir(testFolder, (err, files) => {

	  //res.json(files);

	  //var path = __dirname+'/uploads/'+files;

	  res.header("Access-Control-Allow-Origin", "*");
	  res.json(files);

});

});

//=================================================================================================================
//Code for uploading the documents
//=================================================================================================================
app.post('/upload/:newdir', function(req, res) {



	//console.log("req --->", req);


  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  var sampleFile = req.files;

  	newdir = req.params.newdir;

	//console.log("newdir --->",newdir);

	mkdirp(__dirname+"/"+newdir, function(err) {

    // path exists unless there was an error

	if(err){

		return err;
	}
 });


 //  console.log("newdir --->",newdir);


  //console.log("sampleFile--->",sampleFile);

  var filepath = __dirname +'/'+newdir+'/'+sampleFile.file0.name;
  var sampleFiles = sampleFile.file0;

  console.log(filepath)

  // Use the mv() method to place the file somewhere on your server
  sampleFiles.mv(filepath, function(err) {
	//  res.header('Access-Control-Allow-Origin', "*")
    if (err)
	{//return res.status(500).send(err);
}

	var response=	res.end("File Uploaded Successfully!");
	return response;

//return response;
      //res.send('Files uploaded!');
     // res.end();
  });


});


var server = app.listen(10009, function () {

  var host   = server.address().address
  var port   = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

server.timeout = 0;
