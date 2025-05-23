import { IBrand } from "./IBrand";
import { ICategory } from "./ICategory";

export interface IProduct {
    sold: number;
    images: string[];
    subcategory: ISubcategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category:ICategory;
    brand: IBrand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}


export interface ISubcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}