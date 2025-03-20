import {useQuery} from "@tanstack/react-query";
import axios from "axios";


export default function useCryptoData(page: number, perPage: number, currency: string) {

    async function fetchData() {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}`);
        return response.data;
    }

    const {isError, isLoading, data, error} = useQuery({
        queryKey: [`crypto`, page, perPage, currency],
        queryFn: fetchData,
        refetchInterval: 1000 * 30,
        //staleTime: 1000 * 60,  // Данные считаются актуальными в течение 5 минут
        refetchOnWindowFocus: false, // Запрос не будет повторяться при фокусе окна
    })
    return {isError, isLoading, error, data};
}