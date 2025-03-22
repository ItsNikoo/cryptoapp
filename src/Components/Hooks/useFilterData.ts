// useFilterData.ts
import CryptoProps from "../CryptoList/props.ts";

interface Props {
    data: CryptoProps[] | undefined;
    state: "none" | "asc" | "desc";
    query: string;
    sortBy: "price" | "market_cap";
}

export default function useFilterData({data, state, query, sortBy}: Props) {
    const filteredData = data?.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    const sortedData = filteredData ? [...filteredData] : [];

    if (sortBy === "price") {
        if (state === "asc") {
            sortedData.sort((a, b) => a.current_price - b.current_price);
        } else if (state === "desc") {
            sortedData.sort((a, b) => b.current_price - a.current_price);
        }
    }
    else{
        if (state === "asc") {
            sortedData.sort((a, b) => a.market_cap - b.market_cap);
        } else if (state === "desc") {
            sortedData.sort((a, b) => b.market_cap - a.market_cap);
        }
    }

    return sortedData;
}