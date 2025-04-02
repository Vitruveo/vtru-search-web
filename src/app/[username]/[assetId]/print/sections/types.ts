export interface Segment {
    sectionId: string;
    title: string;
    categories: string[];
    images: {
        preview: string;
    };
}

export interface Category {
    categoryId: string;
    title: string;
}

export interface Catalog {
    sections: Segment[];
    categories: Category[];
}

export interface ProductItem {
    categoryId: string;
    productId: string;
    title: string;
    description: string;
    html: string;
    images: string[];
    price: number;
    shipping: number;
}

export interface Products {
    vertical: ProductItem[];
    horizontal: ProductItem[];
    square: ProductItem[];
}
