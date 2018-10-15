var mongoose = require('../node_modules/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name:{type:String, required:true},
    apellPat:{type:String, required:true},
    apellMat:{type:String, required:true},
    email:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true}
});

module.exports = mongoose.model('user',schema);
