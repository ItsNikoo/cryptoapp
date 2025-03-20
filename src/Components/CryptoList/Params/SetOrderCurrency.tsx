import styles from '../CryptoList.module.css'

interface Props {
    state: string,
    setState: () => void,
}

export default function SetOrderCurrency(props: Props): React.ReactElement {

    return (
        <div className={styles.CurrencyChoiceContainer} >
            <label className={styles.CurrencyChoiceParagraph} >Цена:</label>
            <select value={props.state} onChange={props.setState}>
                <option value='asc'>По возрастанию</option>
                <option value="none">Без сортировки</option>
                <option value='desc'>По убыванию</option>
            </select>
        </div>
    )
}