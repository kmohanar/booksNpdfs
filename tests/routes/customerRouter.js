var express=require('express');
var bodyparser=require('body-parser');
var customerRouter=express.Router();

customerRouter.use(bodyparser.json());


var mysql = require('mysql');
var shareddb  = mysql.createPool({
  connectionLimit : 25,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'shareddb'
});



var beneficiarybank  = mysql.createPool({
  connectionLimit : 25,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'beneficiarybank'
});



var applicantbank  = mysql.createPool({
  connectionLimit : 25,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'applicantbank'
});









customerRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();

})

.get(function(req,res,next){
//res.redirectTo('/customer/:email');
   res.end('will send you customers');

	console.log("customerRouter");

})
.post(function(req,res,next){
	res.end('will add dishes'+req.body.name+'with details'+req.body.description);

})

.delete(function(req,res,next){
	res.end('deleting dishes');
});

customerRouter.route('/:email')
.get(function(req,res,next){


  var param=req.params.email;
  console.log("URL ROUT ",param);

    var queryString = 'SELECT name FROM CUSTOMER WHERE EMAIL=?';
    console.log(queryString);

    shareddb.getConnection(function(err, connection) {
      connection.query(queryString,[param], function(err, rows, fields) {
        if (err){
          res.send("FAILURE");
        }
          console.log("Login Customer ",rows);

        if(rows.length <=0){
          res.send(" [ { Result: 'Failure' } ]");
          return;
        }
        else{
          res.send(rows);
          return
        }

        connection.release();
      });
    });

	//res.end('will send you customers  '+req.params.email);



})
.put(function(req,res,next){
	res.end('will update dish id'+req.params.email+'with name'+req.body.name+'and description'+req.body.description);

})

.delete(function(req,res,next){
	res.end('deleting dish'+req.params.email);
});

module.exports=customerRouter;
