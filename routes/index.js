var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');
var path    = require("path");

router.get('/', function(req, res, next) {
    res.render('shop/index', { title: 'AUTOCLICK' });
});
/**
router.get('/signin/', function(req, res, next) {
  //  res.sendFile(path.join(path.dirname(__dirname)+'//public/login.html'));
    res.render('user/signin');
}); */

router.get('/products', function (req, res, next) {
    Product.find(function (err, docs) {
        var productChuks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChuks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/products', {title: 'AUTOCLICK', products: productChuks});
    });
});

router.get('/products/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        } else {
            cart.add(product, product.id);
            req.session.cart = cart;
            res.redirect('/products/')
        }
    });
});

router.get('/shopping-cart/',function (req,res,next){
    if(!req.session.cart){
        return res.render('shop/shopping-cart',{product:null})
    }else {
        var cart = new Cart(req.session.cart);
        res.render('shop/shopping-cart', {
            products: cart.genereteArray(),
            totalPrice:cart.totalPrice
        });
    }
});
module.exports = router;
