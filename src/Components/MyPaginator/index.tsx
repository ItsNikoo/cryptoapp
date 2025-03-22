import React from 'react'
import styles from "./MyPaginator.module.css"

interface PaginatorProps {
    onNextPageClick: () => void,
    onPreviousPageClick: () => void,
    disabled:{
        left:boolean,
        right:boolean,
    }
    nav?: {
        current: number,
        total: number
    }
}

function MyPaginator(props: PaginatorProps) {
    const {nav = null, disabled, onNextPageClick, onPreviousPageClick } = props
    const handleNextPageClick = () => {
        onNextPageClick()
    }
    const handlePreviousPageClick = () => {
        onPreviousPageClick()
    }

    return (
        <div className={styles.Container}>
            <button className={styles.Button} onClick={handlePreviousPageClick} disabled={disabled.left}>{`<`}</button>
            {nav && (
                <span className={styles.Title}>
                    Страница {nav.current}
                </span>
            )}
            <button className={styles.Button} onClick={handleNextPageClick} disabled={disabled.right}>{`>`}</button>
        </div>
    )
}

export default React.memo(MyPaginator)