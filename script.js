
const input = document.getElementById('itemInput');
const button = document.getElementById('addButton');
const itemList = document.getElementById('itemList');

const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Conectado ao servidor WebSocket');
};

ws.onmessage = (message) => {
  
  if (message.data !== '') {
    const li = document.createElement('li');
    li.textContent = message.data;
    itemList.appendChild(li);
  }
};

ws.onclose = () => {
  console.log('Conexão WebSocket encerrada');
};

button.addEventListener('click', () => {
  const itemText = input.value.trim();
  if (itemText !== '') {
    const li = document.createElement('li');
    ws.send(itemText)
    li.textContent = itemText;
    itemList.appendChild(li);
    input.value = '';
  }
});