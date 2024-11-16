import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IBasketItem {
  id: number;
  userId: string;
  image: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  BestSellingProducts: string | number;
  count: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface BasketStore {
  basketItems: IBasketItem[];
  totalCount: number;
  totalPrice: number;
  addToBasket: (userId: string, item: IBasketItem) => void;
  removeFromBasket: (userId: string, id: number) => void;
  loadBasket: (userId: string) => void;
  updateQuantity: (userId: string, itemId: number, amount: number) => void;
  recalculateTotals: () => void;
}

export const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      basketItems: [],
      totalCount: 0,
      totalPrice: 0,

      addToBasket: (userId, item) => {
        const key = `basket_user_${userId}`;
        const existingItem = get().basketItems.find(
          (basketItem) => basketItem.id === item.id
        );

        const updatedItems = existingItem
          ? get().basketItems.map((basketItem) =>
              basketItem.id === item.id
                ? {
                    ...basketItem,
                    quantity: Math.min(
                      basketItem.quantity + item.quantity,
                      basketItem.count 
                    ),
                  }
                : basketItem
            )
          : [...get().basketItems, item];

        set({ basketItems: updatedItems });
        localStorage.setItem(key, JSON.stringify(updatedItems));
        get().recalculateTotals();
      },

      removeFromBasket: (userId, id) => {
        const key = `basket_user_${userId}`;
        const updatedItems = get().basketItems.filter((item) => item.id !== id);
        set({ basketItems: updatedItems });
        localStorage.setItem(key, JSON.stringify(updatedItems));
        get().recalculateTotals();
      },

      loadBasket: (userId) => {
        const key = `basket_user_${userId}`;
        const storedBasket = JSON.parse(localStorage.getItem(key) ?? "[]");
        set({ basketItems: Array.isArray(storedBasket) ? storedBasket : [] });
        get().recalculateTotals();
      },

      updateQuantity: (userId, itemId, amount) => {
        const key = `basket_user_${userId}`;
        const updatedItems = get().basketItems.map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + amount;
            return {
              ...item,
              quantity: Math.max(1, Math.min(newQuantity, item.count)), // Ensure within 1 and count
            };
          }
          return item;
        });

        set({ basketItems: updatedItems });
        localStorage.setItem(key, JSON.stringify(updatedItems));
        get().recalculateTotals();
      },

      recalculateTotals: () => {
        const basketItems = get().basketItems;
        const totalCount = basketItems.reduce(
          (count, item) => count + item.quantity,
          0
        );
        const totalPrice = basketItems.reduce(
          (total, item) =>
            total + (item.salePrice ?? item.price) * item.quantity,
          0
        );
        set({ totalCount, totalPrice });
      },
    }),
    { name: "basket-storage" }
  )
);
