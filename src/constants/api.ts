export const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV || 'development';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5001';
export const API3_BASE_URL = process.env.NEXT_PUBLIC_API3_BASE_URL || 'http://127.0.0.1:5001';
export const STACK_BASE_URL = process.env.NEXT_PUBLIC_STACK_BASE_URL || 'http://127.0.0.1:5001';
export const STORE_BASE_URL = process.env.NEXT_PUBLIC_STORE_BASE_URL || '';
export const STUDIO_BASE_URL = process.env.NEXT_PUBLIC_STUDIO_BASE_URL || '';
export const SLIDESHOW_BASE_URL = process.env.NEXT_PUBLIC_SLIDESHOW_BASE_URL || '';
export const SEARCH_BASE_URL = process.env.NEXT_PUBLIC_SEARCH_BASE_URL || 'http://localhost:3000';

export const CATALOG_BASE_URL =
    process.env.NEXT_PUBLIC_CATALOG_BASE_URL || 'https://vitruveo-projects.s3.amazonaws.com/Xibit/prod/catalog.json';
export const PRODUCTS_BASE_URL =
    process.env.NEXT_PUBLIC_PRODUCTS_BASE_URL || 'https://vitruveo-projects.s3.amazonaws.com/Xibit/prod/products.json';

export const CATALOG_ASSETS_BASE_URL =
    process.env.NEXT_PUBLIC_CATALOG_ASSETS_BASE_URL || 'https://vitruveo-projects.s3.amazonaws.com/Xibit/assets';
