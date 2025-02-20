"use client";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaginationCoinsTable } from "@/components/common/pagination-coins-table";
import LoadingSpin from "@/components/common/loading-spin";
import { useCrypto } from "@/hooks/useCrypto";
import { useFavorites } from "@/context/FavoritesContext";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, HeartOff } from "lucide-react";

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

  return (
    <div className="p-6">
      <div className="flex justify-start">
        <h1 className="text-3xl font-bold mb-6 dark:text-blue-500 text-green-700">
          Listagem
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
        placeholder="Pesquisar por Nome"
        className="w-[400px] mb-6"
      />

      <Card className="flex-1 pt-3">
        <CardContent>
          <table className="min-w-full text-left mx-auto">
            <thead className="border-b data-[isodd=true]:bg-slate-50">
              <tr>
                <th className="font-semibold text-xs p-4 truncate">Last</th>
                <th className="font-semibold text-xs p-4 truncate">Name</th>
                <th className="font-semibold text-xs p-4 truncate">Img</th>
                <th className="font-semibold text-xs p-4 truncate">Favorite</th>
              </tr>
            </thead>

            <tbody>
              {marketData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b data-[isodd=true]:bg-slate-50 bg-white dark:bg-black"
                >
                  <td className="text-xs p-4 truncate">
                    {item.last_updated
                      ? new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        }).format(new Date(item.last_updated))
                      : "N/A"}
                  </td>
                  <td className="text-xs p-4 truncate">{item.name}</td>
                  <td className="text-xs p-4 text-wrap">
                    <Avatar>
                      <AvatarImage src={item.image} />
                      <AvatarFallback>icon {item.name}</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="text-xs p-4 truncate">
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="text-red-500"
                    >
                      {isFavorite(item.id) ? <Heart /> : <HeartOff />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

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
