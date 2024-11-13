/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PRODUCTS {
  type GetProductsResponse = IProduct[];
  type GetProductsRequest = void;

  type getItemsResponse = IProduct;
  type getItemsRequest = {
    id: string;
  };

  type DeleteProductRecponse = void;
  type DeleteProductRequest = {
    id: number;
  };
}


