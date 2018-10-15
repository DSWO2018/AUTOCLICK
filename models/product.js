var mongoose = require('../node_modules/mongoose');
var Schema = mongoose.Schema;

// marca y stock
var schema = new Schema({
    imagePath:{type:String, required:true},
    mark:{type:String, required:true},
    stock:{type:Number, required:true},
    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true}
});

module.exports = mongoose.model('product',schema);