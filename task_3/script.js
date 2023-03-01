document.addEventListener("DOMContentLoaded", getChat);

const serverUrl = "wss://echo-ws-service.herokuapp.com";


function getChat() {

    const sendBtn = document.getElementById("sendBtn");
    const geoBtn = document.getElementById("geoBtn");
    sendBtn.addEventListener('click', sendMes);
    geoBtn.addEventListener('click', geoMes);


    let socket = new WebSocket(serverUrl);

    socket.onopen = () => {
        writeErrorMes("Соединение установлено, введите сообщение");
    }
    socket.onmessage = (event) => {
        
        showMes(event.data, 'server_mes')      
    }
    socket.onerror = () => {
        writeErrorMes("При передаче данных произошла ошибка");
    }



    function sendMes() {

        writeErrorMes("");

        let message = document.querySelector(".input").value;

        if (message==="") {
            message = "Введите сообщение";
            writeErrorMes(message);
            return;
        }

        document.querySelector(".input").value = "";

        showMes(message, 'user_mes');

        socket.send(message);
    }
}





function geoMes(){

    if ("geolocation" in navigator) {

        let locationOptions = {
          enableHighAccuracy: true
        };

        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);

    } else {
        writeErrorMes("Ваш браузер не поддерживает функцию определения местоположения");
    }
    
    function locationSuccess(data) {

        const latitude = data.coords.latitude;
        const longitude = data.coords.longitude;

        let link = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;

        message = `<a href="${link}" target="_blank" style="color: green">Вы находитесь здесь</a>`;
        showMes(message, "geo_mes")
    }
    
    function locationError() {
        writeErrorMes("При получении местоположения произошла ошибкая");
    }
}




function showMes(mes, mesClass) {

    const mesWindow = document.querySelector('.mes_window');

    mesWindow.insertAdjacentHTML (
        'beforeend',
        `<div class="${mesClass}">${mes}</div>`
    )

    mesWindow.scrollTop = mesWindow.scrollHeight;

}





function writeErrorMes (mes) {
    document.querySelector('.message').innerText = mes;
    document.querySelector('.message').style.color = 'blue';
}