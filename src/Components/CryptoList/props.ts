interface CryptoProps {
    market_cap_rank: number;
    image: string;
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    market_cap_change_percentage_24h: number;
    price_change_percentage_24h: number;
    low_24h: number;
    high_24h: number;
}

export default CryptoProps;