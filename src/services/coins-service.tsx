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
