import styles from '../CryptoList.module.css'

interface Props {
    state: "none" | "asc" | "desc";
    setState: (value: "none" | "asc" | "desc") => void;
}

export default function setOrderMarketCap(props: Props): React.ReactElement {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setState(event.target.value as "none" | "asc" | "desc");
    };

    return (
        <div className={styles.Select}>
            <label className={styles.CurrencyChoiceParagraph}>Капитализация:</label>
            <select value={props.state} onChange={handleChange}>
                <option value='asc'>По возрастанию</option>
                <option value="none">Без сортировки</option>
                <option value='desc'>По убыванию</option>
            </select>
        </div>
    )
}