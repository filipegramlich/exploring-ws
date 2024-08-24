const open_ws_connection_button = document.getElementById('openWsConnectionButton');
const close_ws_connection_button = document.getElementById('closeWsConnectionButton');

let ws;

open_ws_connection_button.addEventListener('click', () => {
  ws = new WebSocket('ws://localhost:3000');
  ws.onopen = () => {
    console.log('OPEN - WebSocket Connection is open');
  };
});

close_ws_connection_button.addEventListener('click', () => {  
  if (ws) {
    ws.close(); 
    console.log('CLOSED - WebSocket Connection is closed')
  }  
});