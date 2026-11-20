import { io } from "socket.io-client"
import readline from "node:readline"

const [token, roomIdArg] = process.argv.slice(2)
const roomId = Number(roomIdArg)
const socket = io("http://localhost:2001", { auth: { token } })

socket.on("connect_error", (err) => console.log("rejected:", err.message))
socket.on("newMessage", (m) => console.log("newMessage:", m))
socket.on("disconnect", (reason) => console.log("disconnected:", reason))

socket.on("connect", () => {
  console.log("connected as:", socket.id)
  socket.emit("joinRoom", { roomId }, (res) => {
    console.log("join:", res)
    console.log("type a message, or /leave, or /join (Ctrl+C to quit)")
  })
})

const rl = readline.createInterface({ input: process.stdin })
rl.on("line", (line) => {
  const text = line.trim()
  if (!text) return
  if (text === "/leave") {
    socket.emit("leaveRoom", { roomId }, (res) => console.log("leave:", res))
  } else if (text === "/join") {
    socket.emit("joinRoom", { roomId }, (res) => console.log("join:", res))
  } else {
    socket.emit("sendMessage", { roomId, content: text }, (res) => console.log("send:", res))
  }
})