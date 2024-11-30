import './App.css';
import { io } from 'socket.io-client';
import {BrowserRouter} from "react-router-dom";
import {MainRouter} from "./routes/MainRouter.tsx";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

const socket = io(serverUrl);

function App() {
  return (
    <BrowserRouter>
        <MainRouter socket={socket} />
    </BrowserRouter>
  )
}

export default App
