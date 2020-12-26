var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
const dateflashsaleSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date:{ type: Date, default: Date.now }
});
module.exports= mongoose.model('DateFlashSale',dateflashsaleSchema);
