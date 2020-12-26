var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const nganhhangSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{type:String,default:"Ghế massage"},
  index:{type:Number,default:1}
});
module.exports= mongoose.model('Nganhhang',nganhhangSchema);
