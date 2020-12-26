var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const categorySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{type:String,default:"chủ đề"},
  index:{type:Number,required:true,default:1}
});
module.exports= mongoose.model('Category',categorySchema);
