import {SocketProps} from "../routes/MainRouter.tsx";
import {ChatFooter} from "./ChatFooter.tsx";
import {ChatBody} from "./ChatBody.tsx";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";


export type User = {
    socketId: string,
    username: string,
};

export interface Message extends User {
    id: string,
    text: string,
};

export const ChatPage = ({ socket }:SocketProps) => {
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('messageResponse', (msg: Message) => {
            setMessages([...messages, msg]);
        })
    }, [messages, socket]);

    useEffect(() => {
      // 👇️ scroll to bottom every time messages change
          lastMessageRef.current?.scrollIntoView();
    }, [messages]);

    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data));
    }, [socket]);

    const handleLeaveChat = () => {
        localStorage.removeItem("username");
        navigate("/");
        window.location.reload();
    }

    const handleJoinChat = () => {
        navigate("/");
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col bg-slate-200 py-8 px-6 rounded-xl w-96 gap-3">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">Chat</h2>
                    {localStorage.getItem("username") ? <button
                        onClick={handleLeaveChat}
                        className="bg-slate-500 rounded w-fit py-1 px-3 mb-3 text-white"
                    >Leave chat</button> : <button
                        className="bg-slate-500 rounded w-fit py-1 px-3 mb-3 text-white"
                        onClick={handleJoinChat}>Join</button>}
                </div>
                <ChatBody
                    messages={messages}
                    typingStatus={typingStatus}
                    lastMessageRef={lastMessageRef}/>
                {localStorage.getItem('username') && <ChatFooter socket={socket} />}
            </div>
        </div>
    );
};