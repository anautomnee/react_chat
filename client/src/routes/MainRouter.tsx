import {Route, Routes} from "react-router-dom";
import {HomePage} from "../components/HomePage.tsx";
import {ChatPage} from "../components/ChatPage.tsx";
import { Socket } from "socket.io-client";

export type SocketProps = {
    socket: Socket;
};

export const MainRouter = ({socket}: SocketProps) => {
    return (
        <Routes>
            <Route path="/" element={<HomePage socket={socket} />} />
            <Route path="/chat" element={<ChatPage socket={socket} />} />
        </Routes>
    )
};