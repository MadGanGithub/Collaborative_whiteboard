import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
//Settings
dotenv.config({ path: "./config/config.env" });
const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3100",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("message-from-s", message => {
        console.log("Message from client:", message);
    });
    socket.on('draw', data => {
        // Broadcast the drawing data to all clients except the sender
        socket.broadcast.emit('draw', data);
        console.log("sss");
    });
    socket.on('draw-start', data => {
        // Broadcast the drawing data to all clients except the sender
        socket.broadcast.emit('draw', data);
        console.log("ddd");
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});
//Listen to the port
server.listen(process.env.PORT, () => {
    console.log(`Server at port:${process.env.PORT} in mode ${process.env.MODE}`);
});
