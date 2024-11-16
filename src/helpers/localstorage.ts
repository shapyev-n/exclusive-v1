// interface IBasket {
//   id: number;
//   userId: string;
//   totalCount: number;
//   totalPrice: number;
//   items: IBasketItem[];
// }

// interface ICheck {
//   id: number;
//   userId: string;
//   totalCount: number;
//   totalPrice: number;
//   items: ICheckItem[];
// }

// interface ICheckItem {
//   id: number;
//   userId: string;
//   quantity: number;
//   price: number;
//   salePrice: number;
//   image: string;
//   title: string;
//   count: number;
//   basket: ICheck[];
//   User: IUser[];
// }

// // interface IBasketItem extends IProduct {
// //   quantity: number;
// //   basket: IBasket[];
// // }

// // interface IFavorite extends IProduct {
// //   quantity: number;
// //   basket: IBasket[];
// // }

// //! Создание корзины, если её нет в `localStorage` для конкретного `userId`
// export function initializeCheck(userId: string) {
//   const basketKey = `check_user_${userId}`;
//   if (!localStorage.getItem(basketKey)) {
//     const initialBasket: IBasket = {
//       id: Date.now(),
//       userId,
//       items: [],
//       totalCount: 0,
//       totalPrice: 0,
//     };
//     localStorage.setItem(basketKey, JSON.stringify(initialBasket));
//   }
// }

// //! Добавление товара в корзину
// export function addToCheck(userId: string, newItem: IBasketItem): boolean {
//   const CheckKey = `check_user_${userId}`;
//   const check: IBasket = JSON.parse(
//     localStorage.getItem(CheckKey) || '{"items": []}'
//   );

//   const existingItem = check.items.find((item) => item.id === newItem.id);
//   if (existingItem) {
//     existingItem.quantity += newItem.quantity;
//   } else {
//     check.items.push(newItem);
//   }

//   // Пересчитываем totalCount и totalPrice
//   check.totalCount = check.items.reduce(
//     (count, item) => count + item.quantity,
//     0
//   );
//   check.totalPrice = check.items.reduce((total, item) => {
//     const price = item.salePrice ?? item.price;
//     return total + price * item.quantity;
//   }, 0);

//   try {
//     localStorage.setItem(CheckKey, JSON.stringify(check));
//     return true;
//   } catch (error) {
//     console.error("Ошибка сохранения корзины:", error);
//     return false;
//   }
// }

// // export function addToBasket(userId: string, newItem: IBasketItem): boolean {
// //   const basketKey = `basket_user_${userId}`;
// //   const basket: IBasket = JSON.parse(
// //     localStorage.getItem(basketKey) || '{"items": []}'
// //   );

// //   const existingItem = basket.items.find((item) => item.id === newItem.id);
// //   if (existingItem) {
// //     existingItem.quantity += newItem.quantity;
// //   } else {
// //     basket.items.push(newItem);
// //   }

// //   basket.totalCount = basket.items.reduce(
// //     (count, item) => count + item.quantity as number,
// //     0
// //   );
// //   basket.totalPrice = basket.items.reduce((total, item) => {
// //     const price = item.salePrice as number ?? item.price as number;
// //     return total + price * item.quantity as number;
// //   }, 0);

// //   try {
// //     localStorage.setItem(basketKey, JSON.stringify(basket));
// //     return true;
// //   } catch (error) {
// //     console.error("Ошибка сохранения корзины:", error);
// //     return false;
// //   }
// // }

// //! Получение корзины
// export function getChech(userId: string): IBasket {
//   const basketKey = `check_user_${userId}`;
//   return JSON.parse(
//     localStorage.getItem(basketKey) ||
//       '{"items": [], "totalCount": 0, "totalPrice": 0}'
//   );
// }

// //! Удаление товара из корзины
// export function removeFromBasket(userId: string, itemId: number) {
//   const basketKey = `basket_user_${userId}`;
//   const basket: IBasket = JSON.parse(
//     localStorage.getItem(basketKey) || '{"items": []}'
//   );

//   basket.items = basket.items.filter((item) => item.id !== itemId);

//   //! Пересчитываем общие количество и цену
//   basket.totalCount = basket.items.reduce(
//     (count, item) => count + item.quantity,
//     0
//   );
//   basket.totalPrice = basket.items.reduce((total, item) => {
//     const price = item.salePrice ?? item.price;
//     return total + price * item.quantity;
//   }, 0);

//   localStorage.setItem(basketKey, JSON.stringify(basket));
// }

// //! Создание избранного, если его нет в `localStorage` для конкретного `userId`
// export function initializeFavorite(userId: string) {
//   const favoriteKey = `favorite_user_${userId}`;
//   if (!localStorage.getItem(favoriteKey)) {
//     localStorage.setItem(favoriteKey, JSON.stringify([]));
//   }
// }

// //! Добавление товара в избранное с учетом уникальности
// export function addToFavorite(userId: string, newItem: IFavorite) {
//   const favoriteKey = `favorite_user_${userId}`;
//   const favorite: IFavorite[] = JSON.parse(
//     localStorage.getItem(favoriteKey) || "[]"
//   );

//   if (!favorite.find((item) => item.id === newItem.id)) {
//     favorite.push(newItem);
//     localStorage.setItem(favoriteKey, JSON.stringify(favorite));
//   }
// }

// //! Удаление товара из избранного
// export function removeFromFavorite(userId: string, itemId: number) {
//   const favoriteKey = `favorite_user_${userId}`;
//   const favorite: IFavorite[] = JSON.parse(
//     localStorage.getItem(favoriteKey) || "[]"
//   );
//   const updatedFavorite = favorite.filter((item) => item.id !== itemId);
//   localStorage.setItem(favoriteKey, JSON.stringify(updatedFavorite));
// }

// //! Получение избранного
// export function getFavorite(userId: string): IFavorite[] {
//   const favoriteKey = `favorite_user_${userId}`;
//   return JSON.parse(localStorage.getItem(favoriteKey) || "[]");
// }

// // Usage example:

// // import {
// //   initializeBasket,
// //   addToBasket,
// //   getBasket,
// //   initializeFavorite,
// //   addToFavorite,
// //   getFavorite,
// // } from "./path/to/your/functions";

// // const userId = 123; // Пример userId текущего пользователя

// //? Инициализация корзины и избранного
// // initializeBasket(userId);
// // initializeFavorite(userId);

// //? Добавление товара в корзину
// // addToBasket(userId, {
// //   id: 1,
// //   title: "Продукт 1",
// //   price: 100,
// //   quantity: 1,
// // });

// //? Получение корзины
// // const basket = getBasket(userId);
// // console.log(basket);

// //? Добавление товара в избранное
// // addToFavorite(userId, 1);

// //? Получение избранного
// // const favorite = getFavorite(userId);
// // console.log(favorite);
