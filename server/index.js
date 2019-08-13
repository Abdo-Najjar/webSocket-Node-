var Server = require('ws').Server;
var s = new Server({port:8000});

s.on('connection' , function(ws){

    ws.on("message" , function(message){
        
        message = JSON.parse(message);
        if(message.type == "name"){
            ws.perosnName = message.data;
            console.log(`${ws.perosnName} connected!`);
            return;
        }

        console.log(`Received ${message.data}`);

        s.clients.forEach(function e (client){
            if(client != ws) 
            client.send(JSON.stringify({
                name:ws.perosnName,
                data:message.data
            }));   
        });
    });



    ws.on("close" , function(){
        console.log("lost a client");
    });
    
    console.log("one more clinet connected");
});