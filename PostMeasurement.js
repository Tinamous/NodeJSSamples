var https = require('https');
var querystring = require('querystring');

// querystring.stringify appears to remove the ""'s from the data which 
// results in that not getting mapped.
// querystring.stringify({"Field1":"23.6"});
var post_data = '{"Field1":"230.6"}'; 

// Setup the HTTP POST options.
var options = {
  // Replace the host with the url of your Tinamous account url.
  host: 'ddd.tinamous.com',
  port: 443,
  path: '/api/v1/Measurements',
  method: 'POST',
  headers: {
	'Content-Type' : 'application/json',
	// Require content length to stop NodeJS chunking.
	'Content-Length': post_data.length,
	
	// Replace the Basic ..... with the appropriate HTTP Basic header for your device.
	// This can be generated from the Tinamous Device Settings -> Helpers page.
	'Authorization': 'Basic Q2...'
  },
};

// Set up the request
var post_req = https.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
	  console.log('Response: ' + chunk);
  });
});

// post the measurement data.
console.log('Posting measurement to Tinamous: ' + post_data);
post_req.write(post_data);
post_req.end();