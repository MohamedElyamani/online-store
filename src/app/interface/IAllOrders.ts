import { IShipping } from "./IShipping";

export interface IAllOrders {
    shippingAddress: IShipping;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    };
    cartItems: Array<{
        count: number;
        _id: string;
        product: {
            subcategory: Array<{
                _id: string;
                name: string;
                slug: string;
                category: string;
            }>;
            ratingsQuantity: number;
            _id: string;
            title: string;
            imageCover: string;
            category: {
                _id: string;
                name: string;
                slug: string;
                image: string;
            };
            brand: null;
            ratingsAverage: number;
            id: string;
        };
        price: number;
    }>;
    paidAt: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
}

