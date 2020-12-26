var Ghemassage = require('../models/ghemassage');
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/ghemassage',{useMongoClient:true});
mongoose.Promise = global.Promise;
var ghemassages = [
  new Ghemassage({
    name:"Ghế Massage Han Quoc",
    image:"http://suaghemassage247.com/image/ghe-massage-osim-mc5000.jpg",
    price:29990000,
    baohanh:"12 tháng",
    title:"Thanh lý ghế massage Poogsan",
    description:"Mô tả"
  }),
  new Ghemassage({
    name:"Ghế Massage Poogsan",
    image:"http://suaghemassage247.com/image/ghe-massage-osim-mc5000.jpg",
    price:29990000,
    baohanh:"12 tháng",
    title:"Thanh lý ghế massage Poogsan",
    description:"Mô tả"
  }),
  new Ghemassage({
    name:"Ghế Massage Poogsan",
    image:"http://suaghemassage247.com/image/ghe-massage-osim-mc5000.jpg",
    price:29990000,
    baohanh:"12 tháng",
    title:"Thanh lý ghế massage Poogsan",
    description:"Mô tả"
  }),
  new Ghemassage({
    name:"Ghế Massage Poogsan",
    image:"http://suaghemassage247.com/image/ghe-massage-osim-mc5000.jpg",
    price:29990000,
    baohanh:"12 tháng",
    title:"Thanh lý ghế massage Poogsan",
    description:"Mô tả"
  }),
  new Ghemassage({
    name:"Ghế Massage Poogsan",
    image:"http://suaghemassage247.com/image/ghe-massage-osim-mc5000.jpg",
    price:29990000,
    baohanh:"12 tháng",
    title:"Thanh lý ghế massage Poogsan",
    description:"Mô tả"
  })
]
var done = 0;
for(var i=0; i<ghemassages.length;i++){
  ghemassages[i].save(function(er,result){
    done++;
    if(done===ghemassages.length){
      exit();
    }
  });
}
function exit(){
  mongoose.disconnect();
}
module.exports = ghemassages;
