

export interface Product {
    inventory: number;
    productName: string;
    _id: string;
    category:string;
    dimensions: string;
    tags: string[];
    _type: "product";
    features: string[];
    image? :{
        asset :{
            _ref :string;
            _type :"image";
        }
    };
    price: number;
    description?:string;
    name: string;
    slug: {
        _type : "slug",
        current: string;
    }
    quantity: number;
}