import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import styles from './CryptoList.module.css'
import MyPaginator from "../MyPaginator";
import {useState} from "react";


export default function CryptoList() {
    const [page, setPage] = useState(1);
    const totalPages = useState(100);
    const [perPage, setPerPage] = useState(10);
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`

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
        queryKey: [`crypto`, page, perPage],
        queryFn: fetchData,
        refetchInterval: 1000 * 30,
        //staleTime: 1000 * 60,  // Данные считаются актуальными в течение 5 минут
        refetchOnWindowFocus: false, // Запрос не будет повторяться при фокусе окна

    })
    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Ошибка: {error.message}</p>;

    const goToNextPage = () => {
        setPage(page+1)
    }
    const goToPreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    }

    const handlePerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPerPage(parseInt(event.target.value, 10))
        setPage(1)
    }

    return (
        <div className={styles.container}>
            <div>
                <label htmlFor="perPage">Элементов на странице</label>
                <select id="perPage" value={perPage} onChange={handlePerPageChange}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <MyPaginator
                    onNextPageClick={goToNextPage}
                    onPreviousPageClick={goToPreviousPage}
                    disabled={{
                        left: page == 1,
                        right: page == totalPages,
                    }}
                    nav={{
                        current: page,
                        total: totalPages,
                    }}
                />
            </div>
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
                {data && data.map((item, index) => (
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