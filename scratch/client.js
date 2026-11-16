import {io} from "socket.io-client"

const socket = io("http://localhost:2001")

socket.on("connect", () => console.log("connected as: ", socket.id))
socket.on("disconnect", () => console.log("disconnected"))