import { Card, CardContent } from "@/components/ui/card";
import { CryptoData } from "@/model/crypto-data-model";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CurrencyFormatter from "../common/currency-formatter";
import { Star, StarOff } from "lucide-react";

interface TableCoinsProps {
  marketData: CryptoData[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export function TableCoins({
  marketData,
  toggleFavorite,
  isFavorite,
}: TableCoinsProps) {
  const { t } = useTranslation();
  return (
    <Card className="flex-1 pt-3">
      <CardContent>
        <table className="min-w-full text-left mx-auto">
          <thead className="border-b data-[isodd=true]:bg-slate-50">
            <tr>
              <th className="font-semibold text-xs p-4 truncate">
                {t("coins.logo")}
              </th>
              <th className="font-semibold text-xs p-4 truncate">
                {t("coins.latestUpdate")}
              </th>
              <th className="font-semibold text-xs p-4 truncate">
                {t("coins.name")}
              </th>
              <th className="font-semibold text-xs p-4 truncate">
                {t("coins.maxValue")}
              </th>
              <th className="font-semibold text-xs p-4 truncate">
                {t("coins.minValue")}
              </th>
              <th className="font-semibold text-xs p-4 truncate">
                {t("coins.favorite")}
              </th>
            </tr>
          </thead>

          <tbody>
            {marketData.map((item, index) => (
              <tr
                key={index}
                className="border-b data-[isodd=true]:bg-slate-50 bg-white dark:bg-black"
              >
                <td className="text-xs p-4 text-wrap">
                  <Avatar>
                    <AvatarImage src={item.image} />
                    <AvatarFallback>icon {item.name}</AvatarFallback>
                  </Avatar>
                </td>
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

                <td className="text-xs p-4 truncate">
                  <CurrencyFormatter value={item.high_24h} />
                </td>
                <td className="text-xs p-4 truncate">
                  <CurrencyFormatter value={item.low_24h} />
                </td>
                <td className="text-xs p-4 truncate">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="dark:text-blue-500 text-green-700"
                  >
                    {isFavorite(item.id) ? <Star /> : <StarOff />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
