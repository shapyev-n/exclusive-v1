interface IUser {
  id: number;
  userId: string;
  image: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  favorites: IFavorite[];
  products: IProduct[];
  basket: IBasket[];
}

interface IProduct {
  id: number;
  userId: string;

  image: string;
  title: string;
  description: string;
  price: number;

  salePrice: number;
  category: string;
  BestSellingProducts: string| number;
  count: number;

  createdAt: string;
  updatedAt: string;
  User: IUser[];
}

interface IFavorite {
  id: number;
  userId: string;

  image: string;
  title: string;
  description: string;
  price: number;
  salePrice: number;
  category: string;
  BestSellingProducts: string | number;
  count: number;
  createdAt: string;
  updatedAt: string;
  User: IUser[];
}

interface IBasket {
  id: number;
  userId: string;
  totalCount: number;
  totalPrice: number;
  items: IBasketItem[];
  User: IUser;
}

interface IBasketItem {
  id: number;
  userId: string;

  image: string;
  title: string;
  description: string;
  price: number;
  salePrice: number;
  category: string;
  BestSellingProducts: string | number;
  count: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  basket: IBasket[];
  User: IUser[];
}

interface ITime {
  name: string;
  time: string;
}
