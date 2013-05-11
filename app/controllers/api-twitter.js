
var http = require('http'), 
    https = require('https'), 
    querystring = require('querystring'), 
    brisk = require('brisk'), 
    Parent = brisk.getBaseController("data");


var config = {
    host: "api.twitter.com", 
    version: "1.1", 
    secure: true,
    ext: "json"
};


controller = Parent.extend({
    
	index: function(req, res){
		//
        this.rest(crud, req, res);
	}
	
    
});

var crud = {
    
    create: function(req, res){
        
    },
    
    read: function(req, res){
        
    },
    
    update: function(req, res){
        
    },
    
    del: function(req, res){
        
    },
    
    
}
    
// Helpers
function query( method, endpoint, params, callback ){
    
      // add token
      params = params;
      // Build the post string from an object
      var data = querystring.stringify(params);
    
      var json = "";
        
      // An object of options to indicate where to post to
      var options = {
          host: config.host,
          path: uri( endpoint ),
          method: method,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': data.length
          }
      };
    
      // Set up the request
      var api_req = http.request(options, callback);
    
      // post the data
      api_req.write(data);
      api_req.end();
    
        
    
}
    
    
function uri( path ){
    return "/"+ config.version +"/"+ path +"."+ config.ext;
}

function callback(response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
        json += chunk;
    });
    response.on('end', function () {
        console.log(json);
    });
}


module.exports = controller;