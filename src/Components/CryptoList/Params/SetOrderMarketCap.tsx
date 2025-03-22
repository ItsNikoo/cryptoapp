import styles from '../CryptoList.module.css'

interface Props {
    state: string,
    setState: () => void,
}

export default function setOrderMarketCap(props: Props): React.ReactElement {

    return (
        <div className={styles.Select} >
            <label className={styles.CurrencyChoiceParagraph} >Капитализация:</label>
            <select value={props.state} onChange={props.setState}>
                <option value='asc'>По возрастанию</option>
                <option value="none">Без сортировки</option>
                <option value='desc'>По убыванию</option>
            </select>
        </div>
    )
}