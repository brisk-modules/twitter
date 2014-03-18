
var OAuth = require("oauth"),
    //http = require('http'), 
    //https = require('https'), 
    //querystring = require('querystring'), 
    brisk = require('brisk'), 
    //crypto = require('crypto'),
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
        
        var self = this;
        var api = req.site.config.api.twitter;
        var token = req.user.accounts.twitter.token;
        
        
        var oauth = new OAuth.OAuth(
            'https://api.twitter.com/oauth/request_token',
            'https://api.twitter.com/oauth/access_token',
            api.key,
            api.secret,
            '1.0A',
            null,
            'HMAC-SHA1'
        );

        oauth.get( url( req.url ),
            token.key, //test user token
            token.secret, //test user secret            
            function (e, data, response){
                if (e) console.error(e);  
                res.end( data );
                //res.data = JSON.parse( data );
                // temp:
                //res.locals = {};
                //self.render( req, res );
            
        });  
        
        //query( "GET", req.url, options, params, callback );
        //res.end( JSON.stringify( req ) );
    },
    
    update: function(req, res){
        
    },
    
    del: function(req, res){
        
    },
    
    
}
    
// Helpers
function query( method, endpoint, options, params, callback ){
    
    /*
      // add token
      //params = params;
      // Build the post string from an object
      var data = querystring.stringify(params);
    
        var path = uri( endpoint );
    //if( method == "GET" ) path = path +"?"+ data;
    
            http://localhost/api/twitter/statuses/user_timeline
        console.log( data );
      // An object of options to indicate where to post to
      var options = {
          host: config.host,
          path: path,
          method: method
      };
    
    Authorization: OAuth 
        oauth_consumer_key: options.key, 
            oauth_nonce: oauth_nonce(), 
                oauth_signature="YlMzeAwoEhkJzmezRiOuDtmFx8w%3D", 
                    oauth_signature_method="HMAC-SHA1", 
                        oauth_timestamp= new Date(), 
                            oauth_token="51621769-qQ0UWjuLCBdbI7plCVxavUrauQkIK9er0J3EYUMvY", 
                                oauth_version="1.0"
        
    if( method == "POST" ){
      options.headers = {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': data.length
          }
    }
    
      // Set up the request
      var api_req = https.request(options, callback);
    
      // post the data
    if( method == "POST" ) api_req.write(data);
      api_req.end();
    
        */
    
}


function url( path ){
    // clean controller path
    path = path.replace("/api/twitter/", "");
    return ((config.secure) ? "https" : "http") +"://"+ config.host +"/"+ config.version +"/"+ path +"."+ config.ext;
}

function uri( path ){
    // clean controller path
    path = path.replace("/api/twitter/", "");
    return "/"+ config.version +"/"+ path +"."+ config.ext;
}

function oauth_nonce(){
    return crypto.createHash('md5').update("anySecretHash").digest("hex");
}
    
function callback(response) {
    var json = "";
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
        json += chunk;
        console.log(chunk);
    });
    response.on('end', function () {
        console.log(json);
    });
}


module.exports = crud;