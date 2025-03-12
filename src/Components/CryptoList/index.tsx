import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import styles from './CryptoList.module.css'

export default function CryptoList() {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1`

    async function fetchData() {
        const response = await axios.get(url)
        return response.data
    }

    const {data, isError, isLoading, error} = useQuery({
        queryKey: [`crypto`],
        queryFn: fetchData,
        refetchInterval: 1000 * 30,
        //staleTime: 1000 * 60,  // Данные считаются актуальными в течение 5 минут
        refetchOnWindowFocus: false, // Запрос не будет повторяться при фокусе окна

    })
    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Ошибка: {error.message}</p>;
    return (
        <>
            <h3>Курс криптовалют</h3>
            <div className={styles.cryptoContainer}>
                {data?.map((item) => (
                    <div key={item.id} className={styles.cryptoItem}>
                        <img className={styles.cryptoImg} src={item.image} alt=""/>
                        <h5>{item.name}</h5>
                        <h6>{item.symbol}</h6>
                        <h5>{item.current_price}</h5>
                    </div>
                ))}
            </div>
        </>

    )
}