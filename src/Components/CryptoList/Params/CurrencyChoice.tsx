import styles from '../CryptoList.module.css'

interface CurrencyProps{
    currency: string
    currencyChange: () => void;
}

export default function CurrencyChoice(props: CurrencyProps) {
    return(
        <div className={styles.CurrencyChoiceContainer}>
            <label className={styles.CurrencyChoiceParagraph} >Выбор валюты</label>
            <select value={props.currency} onChange={props.currencyChange}>
                <option value="rub">RUB</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
            </select>
        </div>
    )
}