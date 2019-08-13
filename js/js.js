
var sockt = new WebSocket('ws://localhost:8000');

sockt.onopen= function(){
  
let name = window.prompt("What is your name?");

    sockt.send(JSON.stringify({
        type:"name",
        data:name
    }));
}

sockt.onmessage = function(event){
    
    let json = JSON.parse(event.data);
    
    let log = document.querySelector('#log');
    
    log.innerHTML+=`${json.name} : ${json.data}<br>`;
}

sockt.onerror = (error) =>{
    console.log(error);
}        

sockt.onclose = ()=>{
    alert("Connection Closed !");
    window.location.reload();
}

var btn = document.querySelector('button');

btn.addEventListener('click' , function(){
    let input = document.querySelector("#text");
    let message =  input.value;

    if(message==""){
        alert("Please enter your message");
        return;
    }
    log.innerHTML+=`You: ${message}<br>`;
    sockt.send(JSON.stringify({
        type:"message",
        data:message
    }));   
 
    input.value ="";

});
