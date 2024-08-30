export interface IProductList {
  status: number;
  message: string;
  data: {
    adminProductList: IProduct[];
    total_records: number;
  };
}
export interface IProduct {
  _id: string;
  productName: string;
  productDescription: string;
  productImages: [];
  productPoints: number;
  productStatus: boolean;
  createdDate: string;
  updatedDate: string;
  __v: number;
}
export interface IProductListReq {
  limit: number;
  page: number;
  search: string;
}
export interface AddProduct {
  productName: string;
  productDescription: string;
  productImages: [];
  productPoints: number;
}
export interface EditProduct {
  _id: string;
  productName: string;
  productDescription: string;
  productImages: [];
  removeImages: [];
  productPoints: number;
  productStatus: true;
}
export interface AddProductRes {
  status: number;
  message: string;
  data: {
    _id: string;
    productName: string;
    productDescription: string;
    productImages: [];
    removeImages: [];
    productPoints: 0;
    productStatus: true;
    __v: number;
  };
}
export interface GetProductDetails {
  status: number;
  message: string;
  data: IProduct;
}
export interface EditProductRes {
  status: number;
  message: string;
  data: {};
}
