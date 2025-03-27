export interface Segment {
    segmentId: string;
    title: string;
    categories: string[];
}

export interface Category {
    categoryId: string;
    title: string;
}

export interface Catalog {
    segments: Segment[];
    categories: Category[];
}
