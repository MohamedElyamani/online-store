export interface IShipping {
    details: string,
    phone: string,
    city: string
}

export interface stripeResponse {
    status: string,
    session: {
        url: string,
        success_url: string,
        cancel_url: string
    }
};
/*******  c6465289-ed27-4901-8669-a693de8ffe77  *******/