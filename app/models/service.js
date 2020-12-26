var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const serviceSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image:{type:String},
  name:{type:String,default:"chủ đề"},
  index:{type:Number,default:1}
});
module.exports= mongoose.model('Service',serviceSchema);
