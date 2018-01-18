var express=require('express');
var bodyparser=require('body-parser');
var dishrouter=express.Router();

dishrouter.use(bodyparser.json());


dishrouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
	res.end('will send you dishes');
})
.post(function(req,res,next){
	res.end('will add dishes'+req.body.name+'with details'+req.body.description);

})

.delete(function(req,res,next){
	res.end('deleting dishes');
});

dishrouter.route('/:dishId')
.get(function(req,res,next){
	res.end('will send you dishe'+req.params.dishId);
})
.put(function(req,res,next){
	res.end('will update dish id'+req.params.dishId+'with name'+req.body.name+'and description'+req.body.description);

})

.delete(function(req,res,next){
	res.end('deleting dish'+req.params.dishId);
});

module.exports=dishrouter;
