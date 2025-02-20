import { useTranslation } from "react-i18next";
import CurrencyFormatter from "../common/currency-formatter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CryptoData } from "@/model/crypto-data-model";
import { SetStateAction } from "react";

interface ExchangeProps {
  handleFromCoinSelection: (coinId: string) => void;
  handleToCoinSelection: (coinId: string) => void;
  fromCoin: CryptoData | null;
  coins: CryptoData[];
  toCoin: CryptoData | null;
  amount: string;
  setAmount: (value: SetStateAction<string>) => void;
  convertedValue: string;
}

export function FormExchange({
  handleFromCoinSelection,
  handleToCoinSelection,
  fromCoin,
  coins,
  toCoin,
  amount,
  setAmount,
  convertedValue,
}: ExchangeProps) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex space-x-4">
        <div>
          <label className="block mb-2">{t("exchange.from")}</label>
          <Select onValueChange={handleFromCoinSelection} value={fromCoin?.id}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecione uma moeda" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {coins.map((coin) => (
                  <SelectItem key={coin.id} value={coin.id}>
                    {coin.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-2">{t("exchange.to")}</label>
          <Select onValueChange={handleToCoinSelection} value={toCoin?.id}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecione uma moeda" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {coins.map((coin) => (
                  <SelectItem key={coin.id} value={coin.id}>
                    {coin.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4">
        <label className="block mb-2">{t("exchange.quantity")}</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-[200px] p-2 border rounded"
        />
      </div>
      <div className="mt-4">
        <p>
          {t("exchange.convertedValue")}
          <CurrencyFormatter value={parseInt(convertedValue)} />
        </p>
      </div>
    </>
  );
}
