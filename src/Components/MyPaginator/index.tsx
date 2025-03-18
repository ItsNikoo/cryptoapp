import React from 'react'
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
        <div>
            <button onClick={handlePreviousPageClick} disabled={disabled.left}>{`<`}</button>
            {nav && (
                <span>
                    Страница {nav.current} из {nav.total}
                </span>
            )}
            <button onClick={handleNextPageClick} disabled={disabled.right}>{`>`}</button>
        </div>
    )
}

export default React.memo(MyPaginator)