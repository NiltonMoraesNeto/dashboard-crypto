"use client";
import { Input } from "@/components/ui/input";
import { PaginationCoinsTable } from "@/components/specific/pagination-coins-table";
import LoadingSpin from "@/components/common/loading-spin";
import { useCrypto } from "@/hooks/useCrypto";
import { useFavorites } from "@/context/FavoritesContext";
import { useTranslation } from "react-i18next";
import { TableCoins } from "@/components/specific/table-coins";

export default function Coins() {
  const {
    marketData,
    loading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useCrypto();

  const { favoriteCoins, toggleFavorite } = useFavorites();

  const isFavorite = (id: string) => {
    return favoriteCoins.includes(id);
  };

  const { t } = useTranslation();

  return (
    <div className="p-6">
      <div className="flex justify-start">
        <h1 className="text-3xl font-bold mb-6 dark:text-blue-500 text-green-700">
          {t("coins.title")}
        </h1>
        {loading && (
          <span className="ml-5">
            <LoadingSpin />
          </span>
        )}
      </div>
      <Input
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder={t("coins.placeholder")}
        className="w-[400px] mb-6"
      />

      <TableCoins
        marketData={marketData}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />

      <PaginationCoinsTable
        currentPage={currentPage}
        itemsPerPage={10}
        coins={marketData}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
