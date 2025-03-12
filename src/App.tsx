import {useState} from 'react'
import './App.css'
import CryptoList from "./Components/CryptoList";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <CryptoList />
        </>
    )
}

export default App
