import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import io from "socket.io-client";
import jsPDF from 'jspdf';
import './drawingboard.css';
import { Socket } from 'socket.io-client';


const DrawingBoard = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [penColor, setPenColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
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

        newSocket.on('draw', (data) => {
            ctx?.lineTo(data.x, data.y);
            ctx?.stroke();
        });

        newSocket.on('draw-start', (data) => {
            setLastX(data.x)
        });
    
        newSocket.on("connect_error", (error: any) => {
            console.error("Connection error:", error);
        });
    
        newSocket.on("error", (error: any) => {
            console.error("Socket error:", error);
        });
    }, []); 
    


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        setCtx(context!);
    }, []);

    const startDrawing = (e:any) => {
        setIsDrawing(true);
        setLastX(e.nativeEvent.offsetX);
        setLastY(e.nativeEvent.offsetY);

        if (socket) {
            socket.emit("draw-start", {
                startX: e.nativeEvent.offsetX,
                startY: e.nativeEvent.offsetY
            });
        }
    };

    const draw = (e:any) => {
        if (!isDrawing || !ctx) return;

        ctx.strokeStyle = penColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();

        setLastX(e.nativeEvent.offsetX);
        setLastY(e.nativeEvent.offsetY);
        console.log("fsdf")
        try{
        socket?.emit("draw", {
            fromX: lastX,
            fromY: lastY,
            toX: e.nativeEvent.offsetX,
            toY: e.nativeEvent.offsetY
        });
    }catch(error){
        console.log(error)
    }
    };

    const endDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    const changeColor = (e:any) => {
        setPenColor(e.target.value);
    };

    const changeBrushSize = (e:any) => {
        setBrushSize(parseInt(e.target.value));
    };

    const saveAsImage = () => {
        const canvasElement = canvasRef.current;
        if (!canvasElement) {
            return;
        }
        html2canvas(canvasElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'whiteboard.png';
            link.href = imgData;
            link.click();
        });
    };

    const saveAsPDF = () => {
        const canvasElement = canvasRef.current;
        if (!canvasElement) {
            return;
        }
    
        const pdf = new jsPDF();
        pdf.addImage(
            canvasElement.toDataURL('image/png'),
            'PNG',
            0,
            0,
            pdf.internal.pageSize.getWidth(),
            pdf.internal.pageSize.getHeight()
        );
        pdf.save('whiteboard.pdf');
    };
    

    return (
        <div>
            <canvas
                ref={canvasRef}
                className="drawing-board"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
            />
            <div className="tools">
                <button onClick={clearCanvas}>Clear</button>
                <input type="color" value={penColor} onChange={changeColor} />
                <input type="range" min="1" max="50" value={brushSize} onChange={changeBrushSize} />
                <button onClick={saveAsImage}>Save as Image</button>
                <button onClick={saveAsPDF}>Save as PDF</button>
            </div>
        </div>
    );
};

export default DrawingBoard;
