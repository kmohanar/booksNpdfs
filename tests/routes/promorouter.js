var express=require('express');
var bodyparser=require('body-parser');

var promorouter=express.Router();


promorouter.use(bodyparser.json());


promorouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
	res.end('will send you promos');
})
.post(function(req,res,next){
	res.end('will add promos'+req.body.name+'with details'+req.body.description);

})

.delete(function(req,res,next){
	res.end('deleting promos');
});

promorouter.route('/:promoId')
.get(function(req,res,next){
	res.end('will send you promo'+req.params.promoId);
})
.put(function(req,res,next){
	res.end('will update promo id'+req.params.promoId+'with name'+req.body.name+'and description'+req.body.description);

})

.delete(function(req,res,next){
	res.end('deleting promo'+req.params.promoId);
});





module.exports=promorouter;
