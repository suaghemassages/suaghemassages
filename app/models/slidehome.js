var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const slidehomeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image:{type:String},
  title:{type:String,required:true},
  index:{type:Number,required:true,default:1},

});
module.exports= mongoose.model('Slidehome',slidehomeSchema);
