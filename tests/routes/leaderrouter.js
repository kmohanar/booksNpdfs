var express=require('express');
var bodyparser=require('body-parser');

var leaderrouter=express.Router();



leaderrouter.use(bodyparser.json());


leaderrouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
	res.end('will send you leaders');
})
.post(function(req,res,next){
	res.end('will add leaders'+req.body.name+'with details'+req.body.description);

})

.delete(function(req,res,next){
	res.end('deleting leaders');
});

leaderrouter.route('/:leaderId')
.get(function(req,res,next){
	res.end('will send you leader'+req.params.leaderId);
})
.put(function(req,res,next){
	res.end('will update leader id'+req.params.leaderId+'with name'+req.body.name+'and description'+req.body.description);

})

.delete(function(req,res,next){
	res.end('deleting leader'+req.params.leaderId);
});




module.exports=leaderrouter;

