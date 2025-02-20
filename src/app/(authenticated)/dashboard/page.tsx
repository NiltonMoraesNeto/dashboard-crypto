"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CryptoData } from "@/model/crypto-data-model";
import { fetchCryptoData } from "@/services/coins-service";
import LoadingSpin from "@/components/common/loading-spin";
import CurrencyFormatter from "@/components/common/currency-formatter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

const defaultCoins = ["bitcoin", "ethereum", "tether"];

export default function Dashboard() {
  const [coins, setCoins] = useState<CryptoData[]>([]);
  const [favoriteCoins, setFavoriteCoins] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    loadCryptoData();
    loadFavoriteCoins();
  }, []);

  const loadCryptoData = async () => {
    setLoading(true);
    try {
      const data = await fetchCryptoData(defaultCoins);
      setCoins(data);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadFavoriteCoins = async () => {
    setLoading(true);
    try {
      const favoriteIds = JSON.parse(
        localStorage.getItem("favoriteCoins") || "[]"
      );
      if (favoriteIds.length > 0) {
        const data = await fetchCryptoData(favoriteIds);
        setFavoriteCoins(data);
      }
    } catch (err) {
      console.error("Error fetching favorite coins:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-start">
        <h1 className="text-3xl font-bold mb-6 dark:text-blue-500 text-green-700">
          Dashboard
        </h1>
        {loading && (
          <span className="ml-5">
            <LoadingSpin />
          </span>
        )}
      </div>

      {/* Default Coins */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coins.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              <Avatar>
                <AvatarImage src={item.image} />
                <AvatarFallback>icon {item.name}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                <CurrencyFormatter value={item.current_price} />
              </div>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.lastUpdated")} -
                {new Intl.DateTimeFormat("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                }).format(new Date(item.last_updated))}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Favorite Coins */}
      <div className="flex justify-start mt-6">
        <h1 className="text-3xl font-bold mb-6 dark:text-blue-500 text-green-700">
          Favoritos
        </h1>
        {loading && (
          <span className="ml-5">
            <LoadingSpin />
          </span>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favoriteCoins.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              <Avatar>
                <AvatarImage src={item.image} />
                <AvatarFallback>icon {item.name}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                <CurrencyFormatter value={item.current_price} />
              </div>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.lastUpdated")} -
                {new Intl.DateTimeFormat("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                }).format(new Date(item.last_updated))}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
