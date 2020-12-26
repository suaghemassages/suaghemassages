var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const bannernewsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image:{type:String,require:true},
  index:{type:Number,required:true,default:1},

});
module.exports= mongoose.model('Bannernews',bannernewsSchema);
