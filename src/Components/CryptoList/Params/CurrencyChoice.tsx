import styles from '../CryptoList.module.css'

interface CurrencyProps {
    currency: "rub" | "usd" | "eur"
    setState: (value: "rub" | "usd" | "eur") => void;
}

export default function CurrencyChoice(props: CurrencyProps) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setState(event.target.value as "rub" | "usd" | "eur");
    };

    return (
        <div className={styles.Select}>
            <label className={styles.CurrencyChoiceParagraph}>Выбор валюты</label>
            <select value={props.currency} onChange={handleChange}>
                <option value="rub">RUB</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
            </select>
        </div>
    )
}