import axios from "axios";
const API_URL = "https://api.coingecko.com/api/v3/simple/price";
const SYMBOLS = ["bitcoin", "ethereum", "dogecoin", "cardano", "polkadot"];

export async function fetchPriceData(): Promise<
  { symbol: string; price: number }[]
> {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ids: SYMBOLS.join(","),
        vs_currencies: "usd",
      },
    });

    return SYMBOLS.map((symbol) => ({
      symbol,
      price: response.data[symbol].usd,
    }));
  } catch (error) {
    console.error("Error fetching price data:", error);
    return [];
  }
}
