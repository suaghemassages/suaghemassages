var path = require('path')
module.exports = {
      entry:'./public/assest/js/main.js',
      output:{
      path:__dirname,
      filename:'./public/assest/js/bundle.js'
    },
    watch:true,
    module:{
      loaders:[
        { test: /\.(css|scss)$/,
          loader: "style-loader!css-loader!sass-loader"
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
		      loader: "file-loader"
        }
      ]
    }
}
