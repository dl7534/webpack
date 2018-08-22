const path = require('path');


module.exports={
    entry:{
        entry:'./src/bundle.js',
        entry2:"./src/bundle2.js"
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{},
    plugins:[],
    devServer:{}
}