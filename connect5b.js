var sys = require("sys");
var ws = require("websocket-server");


var server = ws.createServer();
server.listen(8280);

server.addListener("connection", function(connection){
  connection.addListener("message", function(msg){
    server.send(msg);
    sys.puts("Listening for connections on localhost:8280");
  });
});

// when a client websocket connects
server.addListener("connection", function(conn) {

	// when client writes something
	conn.addListener("message", function(message) {

		// iterate thorough all connected clients, and push this message
		server.manager.forEach(function(connected_client) {
			connected_client.write(JSON.stringify(conn.id + ": " + message));
                });
	});
});

