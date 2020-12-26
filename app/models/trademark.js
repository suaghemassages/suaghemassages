var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const trademarkSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{type:String,default:"Thương Hiệu"},
  index:{type:Number,default:1},
  nganhhang:{type:String}
});
module.exports= mongoose.model('Trademark',trademarkSchema);
