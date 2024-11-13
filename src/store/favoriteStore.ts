import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IFavorite {
  id: number;
  title: string;
  image: string;
  price: number;
  salePrice: number;
}

interface FavoriteStore {
  favoriteData: IFavorite[];
  addToFavorite: (userId: string, item: IFavorite) => void;
  removeFromFavorite: (userId: string, id: number) => void;
  loadFavorites: (userId: string) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favoriteData: [],
      addToFavorite: (userId, item) => {
        const key = `favorite_user_${userId}`;
        const existingItem = get().favoriteData.find(
          (favoriteItem) => favoriteItem.id === item.id
        );
        if (!existingItem) {
          const updatedFavorites = [...get().favoriteData, item];
          set({ favoriteData: updatedFavorites });
          localStorage.setItem(key, JSON.stringify(updatedFavorites));
        }
      },
      removeFromFavorite: (userId, itemId) => {
        const key = `favorite_user_${userId}`;
        const updatedFavorites = get().favoriteData.filter(
          (favoriteItem) => favoriteItem.id !== itemId
        );
        set({ favoriteData: updatedFavorites });
        localStorage.setItem(key, JSON.stringify(updatedFavorites));
      },
      loadFavorites: (userId) => {
        const key = `favorite_user_${userId}`;
        const storedFavorites = JSON.parse(localStorage.getItem(key) || "[]");
        set({ favoriteData: storedFavorites });
      },
    }),
    { name: "favorite-storage" }
  )
);
