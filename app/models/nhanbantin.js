var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const nhanbantinSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email:{type:String, required:true}
});
module.exports= mongoose.model('Nhanbantin',nhanbantinSchema);
