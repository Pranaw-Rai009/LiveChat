import { io } from "socket.io-client"

const socket = io("http://localhost:2001", { auth: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlck5hbWUiOiJhYWtyaXRpX2doaW1pcmUiLCJlbWFpbCI6ImFha3JpdGkxMjNAZ21haWwuY29tIiwiaWF0IjoxNzk0OTY1OTQxLCJleHAiOjE3OTQ5Njc3NDF9.JiMVit1d7fJIi5ZZMb_kNdl0M7kD4dXjb9Lv0ZO0usQ" } })

socket.on("connect", () => {
    console.log("connected as: ", socket.id)
    // console.log(socket.user.id)
    // the extra fields like success and message is optional in payload part , can be not included
    socket.emit("joinRoom", { roomId: 9 }, (res) => console.log(res))
    socket.emit("joinRoom", { roomId: 5 }, (res) => console.log(res))
    socket.emit("joinRoom", { roomId: 56 }, (res) => console.log(res))
    socket.emit("joinRoom", { roomId: "abc" }, (res) => console.log("bad id:", res))
    // settimeout(() => socket.disconnect, 3000)
})

socket.on("connect_error", (err) => console.log("rejected:", err.message))
socket.on("disconnect", () => console.log("disconnected"))

