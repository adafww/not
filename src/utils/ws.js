import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
var stompClient = null;
const handlers = [];

export function connect() {
    const token = localStorage.getItem('user-token')
    const socket = new SockJS(`http://localhost:8086/ws`);
    stompClient = Stomp.over(socket);
    stompClient.connect({Authorization:token}, frame => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/activity', message => {
            handlers.forEach(handler => handler(JSON.parse(message.body)))
        });
    });
}
export function addHandler(handler) {
    handlers.push(handler)
}
export function disconnect() {
    stompClient.disconnect();
    console.log("Disconnected");
}

export function sendMessage(message) {
    stompClient.send("/app/hello", {}, JSON.stringify(message));
}
