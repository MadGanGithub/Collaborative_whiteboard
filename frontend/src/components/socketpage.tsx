import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

const SocketPage = () => {
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState<Socket|null>(null);

    useEffect(() => {
        const newSocket = io("http://localhost:4100/");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to server");
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        newSocket.on("connect_error", (error: any) => {
            console.error("Connection error:", error);
        });
    
        newSocket.on("error", (error: any) => {
            console.error("Socket error:", error);
        });
        // Clean up the connection when the component unmounts
        // return () => {
        //     newSocket.disconnect();
        // };
    }, []); 

    const sendMessage = () => {
        try{
        console.log("inside")
        console.log(socket)
        if (socket) {
            console.log("sd")
            console.log(message)
            socket.emit("message-from-s", message);
            console.log(socket)
        }
    }catch(error){
        console.log(error)
    }
    };
    const stopServer=()=>{
        console.log("stopserver")
        socket?.disconnect();
    }

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
            <button onClick={stopServer}>Stop</button>
        </div>
    );
};

export default SocketPage;
