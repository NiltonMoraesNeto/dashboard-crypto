"use client";

import { useState, useEffect } from "react";
import { fetchAllCoins, fetchMarketData } from "@/services/coins-service";
import { CryptoData } from "@/model/crypto-data-model";
import { toast } from "sonner";

export const useCrypto = () => {
  const [allCoins, setAllCoins] = useState<{ id: string; name: string }[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<string[]>([]);
  const [marketData, setMarketData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadAllCoins = async () => {
      try {
        const coins = await fetchAllCoins();
        setAllCoins(coins);
      } catch (err) {
        console.error("Error fetching coins list:", err);
      }
    };
    loadAllCoins();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCoins(["bitcoin", "ethereum", "tether"]); // Default coins
    } else {
      const filtered = allCoins
        .filter((coin) => coin.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 50) // Limita a busca local para evitar performance ruim
        .map((coin) => coin.id);
      setFilteredCoins(filtered);
    }
  }, [searchQuery, allCoins]);

  useEffect(() => {
    const loadMarketData = async () => {
      if (filteredCoins.length === 0) return;
      setLoading(true);
      try {
        const data = await fetchMarketData(filteredCoins, currentPage, itemsPerPage);
        console.log("🚀 data aqui- ", data)
        setMarketData(data);
      } catch (err) {
        toast.error("Erro", {
        description: "Error fetching market data: " + err,
      });
        console.error("Error fetching market data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMarketData();
  }, [filteredCoins, currentPage]);

  return {
    marketData,
    loading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(filteredCoins.length / itemsPerPage),
  };
};
