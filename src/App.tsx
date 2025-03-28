import './App.css'
import CryptoList from "./Components/CryptoList";
import WebSocketChat from "./Components/WebSocketChat";
import {Routes, Route} from "react-router";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<CryptoList />} />
                <Route path="chat" element={<WebSocketChat />} />
            </Routes>
        </>
    )
}

export default App
