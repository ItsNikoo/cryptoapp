import styles from './CryptoList.module.css'
import defaultStyles from "../Default.module.css"

import MyPaginator from "../MyPaginator";
import CryptoTable from "./Params/CryptoTable.tsx";
import CurrencyChoice from "./Params/CurrencyChoice.tsx";
import SetOrderCurrency from "./Params/SetOrderCurrency.tsx";
import SetOrderMarketCap from "./Params/SetOrderMarketCap.tsx";

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
    const [currency, setCurrency] = useState<"rub" | "usd" | "eur">(() => {
        const savedCurrency = localStorage.getItem("currency");
        return (savedCurrency as "rub" | "usd" | "eur") || "usd";
    });
    const [query, setQuery] = useState("")
    const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
    const [sortOrderCap, setSortOrderCap] = useState<"none" | "asc" | "desc">("none");

    useEffect(() => {
        localStorage.setItem("currency", currency);
        localStorage.setItem("page", page.toString());
    }, [currency, page]);

    const {data, isError, isLoading, error} = useCryptoData(page, perPage, currency);
    const filteredData = useFilterData({
        data,
        state: sortOrder !== "none" ? sortOrder : sortOrderCap, // Приоритет у сортировки по цене
        query,
        sortBy: sortOrder !== "none" ? "price" : "market_cap", // Определяем критерий сортировки
    });

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

    const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newPerPage = parseInt(event.target.value);
        setPerPage(newPerPage);
        localStorage.setItem("perPage", newPerPage.toString());
        setPage(1)
    }

    const currencyChange = (value: ("rub" | "usd" | "eur")) => {
        setCurrency(value)
    }

    if (isLoading) return <p>Загрузка...</p>;
    if (isError) return <p>Ошибка: {error?.message}</p>;
    return (
        <div className={styles.Container}>
            <a className={defaultStyles.Button} href="/chat">Чат</a>
            <div className={styles.HigherContainer}>
                <div className={styles.InputContainer}>
                    <input className={styles.Input} type="text" value={query} onChange={(e) => {
                        setQuery(e.target.value)
                    }}/>
                </div>
                <div className={styles.ParamsContainer}>
                    <SetOrderMarketCap state={sortOrderCap} setState={(value) => {
                        setSortOrderCap(value)
                        setSortOrder('none')
                    }}/>
                    <SetOrderCurrency state={sortOrder} setState={(value) => {
                        setSortOrder(value)
                        setSortOrderCap('none')
                    }}/>
                    <CurrencyChoice currency={currency} setState={currencyChange}/>
                </div>
            </div>

            <CryptoTable data={filteredData} currency={currency}/>

            <div className={styles.PaginationContainer}>
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
                <div className={styles.Select}>
                    <label htmlFor="perPage">Элементов на странице</label>
                    <select id="perPage" value={perPage} onChange={handlePerPageChange}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
        </div>
    );
}