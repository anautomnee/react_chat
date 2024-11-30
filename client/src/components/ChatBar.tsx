import {useEffect, useState} from "react";
import {SocketProps} from "../routes/MainRouter.tsx";
import {User} from "./ChatPage.tsx";

export const ChatBar = ({socket}: SocketProps) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        socket.on('newUserResponse', (data: User[]) => setUsers(data));
    }, [socket, users]);
    return (
        <div>
            <h3>Active users</h3>
            {users.map((user) => (
                <div key={user.socketId}>{user.username}</div>
            ))}
        </div>
    )
};