import apiCoinGecko from "./api-coin-gecko";

export const fetchCryptoData = async (coins: string[]) => {
  try {
    const response = await apiCoinGecko.get("/coins/markets", {
      params: {
        vs_currency: "brl", // Define a moeda de conversão
        ids: coins.join(","), // Converte o array em uma string separada por vírgula
      },
    });

    console.log("🚀 response - ", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar as moedas", error);
    return false;
  }
};

export const searchCrypto = async (query: string) => {
  try {
    const { data } = await apiCoinGecko.get(`search?query=${query}`);
    return data.coins.map((coin: { id: string; name: string; symbol: string; large: string }) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.large,
    }));
  } catch (error) {
    console.error("Erro ao buscar criptomoedas:", error);
    return [];
  }
};

export const fetchAllCoins = async () => {
  try {
    const response = await apiCoinGecko.get("/coins/list");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todas as moedas", error);
    return [];
  }
};

export const fetchMarketData = async (coinIds: string[], page: number = 1, perPage: number = 10) => {
  try {
    const ids = coinIds.join(",");
    const response = await apiCoinGecko.get(`/coins/markets`, {
      params: {
        vs_currency: "usd",
        ids,
        order: "market_cap_desc",
        per_page: perPage,
        page,
        sparkline: false,
      },
    });

    return response.data; // ✅ Axios retorna os dados aqui
  } catch (error) {
    console.error("Failed to fetch market data:", error);
    throw new Error("Failed to fetch market data");
  }
};