"use client";
import { fetchCryptoData } from "@/services/coins-service";
import React, { createContext, useState, useEffect, useContext } from "react";

// Definição do tipo do contexto
interface FavoritesContextType {
  favoriteCoins: string[];
  toggleFavorite: (id: string) => void;
  loadFavoriteCoins: () => void;
}

// Criando o contexto
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// **Provider** que envolverá a aplicação
export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([]);

  // Função para carregar favoritos do localStorage
  const loadFavoriteCoins = () => {
    try {
      const storedFavorites = localStorage.getItem("favoriteCoins");
      if (storedFavorites) {
        const favoriteIds = JSON.parse(storedFavorites);
        fetchCryptoData(favoriteIds).then((favoriteData) => {
          setFavoriteCoins(favoriteData);
        });
      }
    } catch (error) {
      console.error("Error loading favorite coins:", error);
    }
  };

  // Alternar favoritos
  const toggleFavorite = (id: string) => {
    try {
      const storedFavorites = localStorage.getItem("favoriteCoins");
      let favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (favoriteIds.includes(id)) {
        // Remove do favorito
        favoriteIds = favoriteIds.filter((coinId: string) => coinId !== id);
      } else {
        // Adiciona ao favorito
        favoriteIds.push(id);
      }

      // Atualiza no localStorage
      localStorage.setItem("favoriteCoins", JSON.stringify(favoriteIds));

      // Atualiza o estado diretamente
      setFavoriteCoins(favoriteIds);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Carregar favoritos ao iniciar o app
  useEffect(() => {
    loadFavoriteCoins();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favoriteCoins, toggleFavorite, loadFavoriteCoins }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
