var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const ghemassageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{type:String, required:true},
  nameseo:{type:String, required:true},
  status:{type:Boolean},
  nganhhang:{type:String, default:"Ghế massage"},
  trademark:{type:String,default:"Korea"},
  image:{type:Array,default:"no"},
  imagedefault:{type:Array,default:"no"},
  price:{type:Number,required:true},
  pricesale:{type:Number,required:true},
  baohanh:{type:String,default:"12 tháng"},
  title:{type:String,default:"Title"},
  description:{type:String,default:"Mô tả"},
  ogtitle:{type:String,default:"ogtitle"},
  ogdescription:{type:String,default:"ogdescription"},
  keywords:{type:String,default:"keywords"},
  index:{type:Number,default:1},
  flashsale:{type:Boolean},
  bestsell:{type:Boolean}
});
module.exports= mongoose.model('Ghemassage',ghemassageSchema);
