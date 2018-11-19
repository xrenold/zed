var fs = require('fs')

var rendered


function zed(filepath, options, callback){
    fs.readFile(filepath, function(err, data){
        if(err){
            console.log('zed', err)
            return(callback(err))
        }
        data = data.toString()
        console.log('options', options)
        var keys = Object.keys(options)
        for(var i=0; i<keys.length;i++){
            //console.log(options[element])
            console.log(typeof(options[keys[i]]))
            if(typeof(options[keys[i]]) == "string"){
                //console.log("replaced", "#{"+keys[i]+"}", options[keys[i]])
                data = data.replace(new RegExp("#{"+keys[i]+"}", 'igm'), options[keys[i]])
                //console.log("after replace", data)
            }
        
        }
        console.log("final", data)
        rendered = data
        return callback(null, rendered)
        
    })
    
}

module.exports = zed;