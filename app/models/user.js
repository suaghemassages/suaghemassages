var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username:{type:String, required:true},
  password:{type:String, required:true}
});
module.exports= mongoose.model('User',userSchema);
