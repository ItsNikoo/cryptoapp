import styles from './CryptoList.module.css'
import MyPaginator from "../MyPaginator";
import CryptoTable from "./Params/CryptoTable.tsx";
import CurrencyChoice from "./Params/CurrencyChoice.tsx";
import SetOrderCurrency from "./Params/SetOrderCurrency.tsx";

import {useState, useEffect} from "react";
import useCryptoData from "../Hooks/useCryptoData.ts";
import useFilterData from "../Hooks/useFilterData.ts";

export default function CryptoList() {
    const [page, setPage] = useState(() => {
        const savedPage = localStorage.getItem("page");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const totalPages = 1000;
    const [perPage, setPerPage] = useState(() => {
        const perPage = localStorage.getItem("perPage");
        return perPage ? parseInt(perPage, 10) : 10;
    });
    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem("currency");
        return savedCurrency || 'usd';
    });
    const [query, setQuery] = useState("")
    const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

    useEffect(() => {
        localStorage.setItem("currency", currency);
        localStorage.setItem("page", page);
    }, [currency, page]);

    const {data, isError, isLoading, error} = useCryptoData(page, perPage, currency);
    const filteredData = useFilterData({data, state: sortOrder, query});

    const goToNextPage = () => {
        const newPage = page + 1;
        setPage(newPage);
        localStorage.setItem("page", newPage.toString()); // Сохраняем новую страницу
    }
    const goToPreviousPage = () => {
        const newPage = Math.max(page - 1, 1);
        setPage(newPage);
        localStorage.setItem("page", newPage.toString()); // Сохраняем новую страницу
    }

    const handlePerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPerPage = parseInt(event.target.value);
        setPerPage(newPerPage);
        localStorage.setItem("perPage", newPerPage.toString());
        setPage(1)
    }

    const currencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value)
    }

    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Ошибка: {error.message}</p>;
    return (
        <div className={styles.container}>
            <div className={styles.HigherContainer}>
                <div className={styles.InputContainer}>
                    <input className={styles.Input} type="text" value={query} onChange={(e) => {
                        setQuery(e.target.value)
                    }}/>
                </div>
                <div className={styles.ParamsContainer}>
                    <SetOrderCurrency state={sortOrder} setState={(e) => setSortOrder(e.target.value)}/>
                    <CurrencyChoice currency={currency} currencyChange={currencyChange}/>
                </div>
            </div>

            <CryptoTable data={filteredData} currency={currency}/>

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
        </div>
    );
}