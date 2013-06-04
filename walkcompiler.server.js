var connect = require('connect')
  , sharejs = require('share').server
  , port = process.env.PORT || 8888;

require('redis')

var server = connect(
  connect.logger()
, connect.static(__dirname + '/build')
)

var options = {db: {type: 'redis'}}

// Attach the sharejs REST and Socket.io interfaces to the server
sharejs.attach(server, options);

server.listen(port, function(){
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
