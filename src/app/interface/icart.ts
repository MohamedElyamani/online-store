
export interface ICart {
    _id: string;
    cartOwner: string;
    products: Array<{
        count: number;
        _id: string;
        product: {
            subcategory: Array<{
                _id: string;
                name: string;
                slug: string;
                category: string;
            }>;
            _id: string;
            title: string;
            quantity: number;
            imageCover: string;
            category: {
                _id: string;
                name: string;
                slug: string;
                image: string;
            };
            brand: string | null;
            ratingsAverage: number;
            id: string;
        };
        price: number;
    }>;
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}

