"use client";
import { useEffect, useState, useCallback } from "react";
import type { CryptoData } from "@/model/crypto-data-model";
import { fetchCryptoData } from "@/services/coins-service";
import { useTranslation } from "react-i18next";
import { FormExchange } from "@/components/specific/form-exchange";

export default function Exchange() {
  const defaultCoins = [
    "bitcoin",
    "ethereum",
    "tether",
    "dogecoin",
    "ripple",
    "cardano",
  ];

  const [coins, setCoins] = useState<CryptoData[]>([]);
  const [fromCoin, setFromCoin] = useState<CryptoData | null>(null);
  const [toCoin, setToCoin] = useState<CryptoData | null>(null);
  const [convertedValue, setConvertedValue] = useState("0.00");
  const [amount, setAmount] = useState("0.00");
  const { t } = useTranslation();

  useEffect(() => {
    loadCryptoData();
  }, []);

  const loadCryptoData = async () => {
    try {
      const data = await fetchCryptoData(defaultCoins);
      setCoins(data);
      if (data.length > 1) {
        setFromCoin(data[0]);
        setToCoin(data[1]);
      }
    } catch (err) {
      console.error("Error fetching crypto data:", err);
    }
  };

  const fetchConversionRate = useCallback(() => {
    if (fromCoin && toCoin) {
      const rate = fromCoin.current_price / toCoin.current_price || 1;
      setConvertedValue((Number.parseFloat(amount) * rate).toFixed(6));
    }
  }, [fromCoin, toCoin, amount]);

  useEffect(() => {
    fetchConversionRate();
  }, [fromCoin, toCoin, amount, fetchConversionRate]);

  const handleFromCoinSelection = (coinId: string) => {
    const selectedCoin = coins.find((coin) => coin.id === coinId);
    if (selectedCoin) {
      setFromCoin(selectedCoin);
      // Se a moeda selecionada for a mesma que toCoin, troque toCoin para a moeda anterior de fromCoin
      if (selectedCoin.id === toCoin?.id) {
        setToCoin(fromCoin);
      }
    }
  };

  const handleToCoinSelection = (coinId: string) => {
    const selectedCoin = coins.find((coin) => coin.id === coinId);
    if (selectedCoin) {
      setToCoin(selectedCoin);
      // Se a moeda selecionada for a mesma que fromCoin, troque fromCoin para a moeda anterior de toCoin
      if (selectedCoin.id === fromCoin?.id) {
        setFromCoin(toCoin);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-start">
        <h1 className="text-3xl font-bold mb-6 dark:text-blue-500 text-green-700">
          {t("exchange.title")}
        </h1>
      </div>
      <FormExchange
        handleFromCoinSelection={handleFromCoinSelection}
        handleToCoinSelection={handleToCoinSelection}
        fromCoin={fromCoin}
        coins={coins}
        toCoin={toCoin}
        amount={amount}
        setAmount={setAmount}
        convertedValue={convertedValue}
      />
    </div>
  );
}
