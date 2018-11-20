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
        console.log('after variables', data)
        //---> actual parsing --->
        var obj;
        var stack = [];
        var regex =/\s?[a-z]*\d?:|;$/gm
        while((obj = regex.exec(data))){
            if(obj[0].trim() != ';'){
                console.log('search', obj[0])
                console.log('slice', obj[0].slice(0, obj[0].length -1), )
                var tag = obj[0].slice(0, obj[0].length -1).trim()
                stack.push(tag)
                data = data.replace(obj[0], '<'+tag+'>')
            }
            else{
                console.log('close', stack)
                var close = stack.pop()
                data = data.replace(';', '</'+close+'>')
            }
        }
        
        //--->return rendered file --->
        console.log("final", data)
        rendered = data
        return callback(null, rendered)
        
    })
    
}

module.exports = zed;