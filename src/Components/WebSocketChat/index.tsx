import {useEffect, useState, useCallback} from "react";
import {io, Socket} from "socket.io-client";
import defaultStyles from "../Default.module.css"
import styles from "./WebSocketChat.module.css"

type MessageType = {
    text: string
    username?: string
    timestamp: string
}

type SystemMessageType = {
    text: string;
    timestamp: string
};

type ChatMessage = {
    type: "message" | "system";
    data: MessageType | SystemMessageType
};

export default function WebSocketChat() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const ws = io('ws://89.169.168.253:4500', {
            transports: ['websocket', 'polling']
        });

        ws.on("connect", () => {
            console.log("Connected");
            setSocket(ws);
        });

        ws.on("message", (message: MessageType) => {
            setMessages((prev) => [...prev, {type: "message", data: message}]);
        });

        ws.on("system", (systemMessage: SystemMessageType) => {
            setMessages((prev) => [...prev, {type: "system", data: systemMessage}]);
        });

        ws.on("disconnect", () => {
            console.log("Disconnected");
            setSocket(null);
        });
        return () => {
            ws.disconnect();
        };
    }, []);

    const sendMessage = useCallback(() => {
        if (!socket || !input.trim()) return;

        if (input.startsWith("/name")) {
            const parts = input.split(" ");
            if (parts.length < 2) return alert("Введите имя после /name");
            const newUserName = parts[1]
            socket.emit("set_username", {username: newUserName});
            setUsername(newUserName);
        } else {
            if (!username) {
                alert("Введите имя с помощью /name [ваше имя]");
                return;
            }
            socket.emit("message", {text: input, username});
        }
        setInput("");
    }, [socket, input, username])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage();
    };

    return (
        <div className={styles.Container}>
            <a href="/" className={defaultStyles.Button}>На главную</a>

            <div className={styles.Header}>
                <h2>Чат {username && `(${username})`}</h2>
            </div>

            <div className={styles.ChatWindow}>
                {messages.map((msg, index) => (
                    <div key={index} className={styles.Message}>
                        {msg.type === "system" ? (
                            <>
                                <em>{msg.data.text}</em>
                                <small>{new Date(msg.data.timestamp).toLocaleTimeString()}</small>
                            </>
                        ) : (
                            <>
                                <strong>{(msg.data as MessageType).username}:</strong>
                                <span>{(msg.data as MessageType).text}</span>
                                <small>{new Date(msg.data.timestamp).toLocaleTimeString()}</small>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className={styles.Form}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={username ? "Введите сообщение..." : "Установите имя: /name ВашеИмя"}
                    disabled={!socket?.connected}
                    className={styles.Input}
                />
                <button type="submit" disabled={!socket?.connected || input.trim() === ""} className={styles.SubmitButton}>
                    Отправить
                </button>
                <div className={styles.Status}>
                    Статус: {socket?.connected ? "Подключено" : "Не подключено"}
                </div>
            </form>
        </div>
    );

}