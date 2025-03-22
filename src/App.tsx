import './App.css'
import CryptoList from "./Components/CryptoList";
import {Routes, Route} from "react-router";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<CryptoList />} />
                <Route path="chat" element={"chat"} />
            </Routes>
        </>
    )
}

export default App
