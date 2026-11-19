import { io } from "socket.io-client"
const [token, roomId, msg] = process.argv.slice(2)
const socket = io("http://localhost:2001", { auth: { token } })

// socket.on("connect", () => {
//     console.log("connected as: ", socket.id)
//     // console.log(socket.user.id)
//     // the extra fields like success and message is optional in payload part , can be not included
//     socket.emit("joinRoom", { roomId: 9 }, (res) => console.log(res))
//     socket.emit("joinRoom", { roomId: 5 }, (res) => console.log(res))
//     socket.emit("joinRoom", { roomId: 56 }, (res) => console.log(res))
//     socket.emit("joinRoom", { roomId: "abc" }, (res) => console.log("bad id:", res))
//     // settimeout(() => socket.disconnect, 3000)
// })

// const [token, roomId, msg] = process.argv.slice(2)
socket.on("connect_error", (err) => console.log("rejected:", err.message))
socket.on("newMessage", (msg) => console.log("New message: ", msg))


socket.on("connect", () => {
    console.log("Connected as: ", socket.id)
    socket.emit("joinRoom", {roomId: 10}, (res) => {
        console.log("JoinRoom: ", res)
        if(msg) {
            socket.emit("sendMessage", {roomId: Number(roomId), content: msg}, (res) => console.log("send:", res))
        }
    })
})

socket.on("disconnect", () => console.log("disconnected"))

