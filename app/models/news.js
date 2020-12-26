var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const newsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:{type:String, required:true},
  titleseo:{type:String,default:"titleseo"},
  shortdescription:{type:String,default:"mô tả ngắn"},
  description:{type:String,default:"mô tả "},
  day:{type: Date, default: Date.now},
  ogtitle:{type:String,default:"title"},
  ogdescription:{type:String,default:"mo ta "},
  keywords:{ type : String , default :"keywords" },
  hotnews:{type:Boolean},
  lastnews:{type:Boolean},
  slidenews:{type:Boolean},
  category:{type:String},
  image:{type:String},
  index:{type:Number,default:1},
  view:{type:Number,default:0}
});
module.exports= mongoose.model('News',newsSchema);
