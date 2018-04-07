/*eslint-env node*/
'use strict';
(function() {
    var udp = require('dgram');

// --------------------creating a udp udpServer --------------------

// creating a udp udpServer
    var udpServer = udp.createSocket('udp4');

// emits when any error occurs
    udpServer.on('error', function(error) {
        console.log('Error: ' + error);
        udpServer.close();
    });

// emits on new datagram msg
    udpServer.on('message', function(msg, info) {
        console.log('Data received from client : ' + msg.toString());
        console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);

//sending msg
        udpServer.send(msg, info.port, 'localhost', function(error) {
            if (error) {
                udpServer.close();
            } else {
                console.log('Data sent !!!');
            }

        });

    });

//emits when socket is ready and listening for datagram msgs
    udpServer.on('listening', function() {
        var address = udpServer.address();
        var port = address.port;
        var family = address.family;
        var ipaddr = address.address;
        console.log('Server is listening at port' + port);
        console.log('Server ip :' + ipaddr);
        console.log('Server is IP4/IP6 : ' + family);
    });

//emits after the socket is closed using socket.close();
    udpServer.on('close', function() {
        console.log('Socket is closed !');
    });

    udpServer.bind(5501);

    setTimeout(function() {
        udpServer.close();
    }, 8000);

})();
