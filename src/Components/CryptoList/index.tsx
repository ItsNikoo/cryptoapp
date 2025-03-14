import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import styles from './CryptoList.module.css'



export default function CryptoList() {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1`


    function translateMarketCap(marketCap: number): string {
        if (marketCap >= 1e12) {
            // Триллионы
            return `$${(marketCap / 1e12).toFixed(2)}T`;
        } else if (marketCap >= 1e9) {
            // Миллиарды
            return `$${(marketCap / 1e9).toFixed(2)}B`;
        } else if (marketCap >= 1e6) {
            // Миллионы
            return `$${(marketCap / 1e6).toFixed(2)}M`;
        } else if (marketCap >= 1e3) {
            // Тысячи
            return `$${(marketCap / 1e3).toFixed(2)}K`;
        } else {
            // Меньше тысячи
            return `$${marketCap.toLocaleString()}`;
        }
    }

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
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>Market change</th>
                    <th>Price change</th>
                    <th>Low</th>
                    <th>High</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.market_cap_rank} </td>
                        <td className={styles.cryptoNameBar}>
                            <img className={styles.cryptoImage} src={item.image} alt=""/>
                            <div className={styles.smallCryptoNameBar}>
                                <p className={styles.cryptoName}>{item.name}</p>
                                <p className={styles.cryptoSymbol}>{item.symbol}</p>
                            </div>
                        </td>
                        <td className={styles.defaultText}>${item.current_price}</td>
                        <td>{translateMarketCap(item.market_cap)}</td>
                        <td className={item.market_cap_change_percentage_24h < 0 ? styles.negative : styles.positive}>
                            {item.market_cap_change_percentage_24h}%
                        </td>
                        <td className={item.price_change_percentage_24h < 0 ? styles.negative : styles.positive}>
                            {item.price_change_percentage_24h}%
                        </td>
                        <td>${item.low_24h}</td>
                        <td>${item.high_24h}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}