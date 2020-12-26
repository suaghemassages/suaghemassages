var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    phone:{type:String,required:true},
    email:{type:String,default:"vinh230787@gmail.com"},
    note: {type: String, required: false}
});

module.exports = mongoose.model('Order', schema);
