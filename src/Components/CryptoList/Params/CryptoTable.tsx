// src/Components/CryptoList/Params/CryptoTable.tsx
import styles from "../CryptoList.module.css";
import CryptoProps from "../props.ts";

interface CryptoTableProps {
    data: CryptoProps[];
    currency: "usd" | "eur" | "rub";
}

const currencySymbols = {
    usd: "$",
    eur: "€",
    rub: "₽",
};

export default function CryptoTable({ data, currency }: CryptoTableProps) {
    function translateMarketCap(marketCap: number): string {
        if (marketCap >= 1e12) {
            return `${currencySymbols[currency]}${(marketCap / 1e12).toFixed(2)}T`;
        } else if (marketCap >= 1e9) {
            return `${currencySymbols[currency]}${(marketCap / 1e9).toFixed(2)}B`;
        } else if (marketCap >= 1e6) {
            return `${currencySymbols[currency]}${(marketCap / 1e6).toFixed(2)}M`;
        } else if (marketCap >= 1e3) {
            return `${currencySymbols[currency]}${(marketCap / 1e3).toFixed(2)}K`;
        } else {
            return `${currencySymbols[currency]}${marketCap.toLocaleString()}`;
        }
    }

    return (
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
                    <td>{item.market_cap_rank}</td>
                    <td className={styles.cryptoNameBar}>
                        <img className={styles.cryptoImage} src={item.image} alt="" />
                        <div className={styles.smallCryptoNameBar}>
                            <p className={styles.cryptoName}>{item.name}</p>
                            <p className={styles.cryptoSymbol}>{item.symbol}</p>
                        </div>
                    </td>
                    <td className={styles.defaultText}>{currencySymbols[currency]}{item.current_price}</td>
                    <td>{translateMarketCap(item.market_cap)}</td>
                    <td className={item.market_cap_change_percentage_24h < 0 ? styles.negative : styles.positive}>
                        {item.market_cap_change_percentage_24h}%
                    </td>
                    <td className={item.price_change_percentage_24h < 0 ? styles.negative : styles.positive}>
                        {item.price_change_percentage_24h}%
                    </td>
                    <td>{currencySymbols[currency]}{item.low_24h}</td>
                    <td>{currencySymbols[currency]}{item.high_24h}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}