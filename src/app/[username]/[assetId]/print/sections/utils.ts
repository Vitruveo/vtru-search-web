import { api } from '@/services/api';
import { ProductItem, Products } from './types';

export const getProductsImages = async ({
    products,
    assetId,
    onlyFirst,
}: {
    products: ProductItem[];
    assetId: string;
    onlyFirst?: boolean;
}): Promise<ProductItem[]> => {
    const requests = products.flatMap(({ productId, images }) =>
        (onlyFirst ? images.slice(0, 1) : images).map((imgName) => ({
            productId,
            imgName,
            source: `https://vitruveo-projects.s3.amazonaws.com/Xibit/assets/${productId}/${imgName.replace(/^~\//, '')}`,
        }))
    );

    const results = await Promise.allSettled(
        requests.map(async ({ productId, imgName, source }) => {
            try {
                if (!imgName.includes('chroma')) return { productId, imgName, response: source, success: true };

                const { data, headers } = await api.get(
                    `assets/public/printOutputGenerator/${assetId}?source=${encodeURIComponent(source)}`,
                    { responseType: 'blob' }
                );

                return {
                    productId,
                    imgName,
                    response: URL.createObjectURL(new Blob([data], { type: headers['content-type'] })),
                    success: true,
                };
            } catch (error) {
                return { productId, imgName, response: error, success: false };
            }
        })
    );

    const processedResults: Record<string, string[]> = {};
    results.forEach((r) => {
        if (r.status === 'fulfilled' && r.value.success) {
            const { productId, response } = r.value;
            processedResults[productId] = processedResults[productId] || [];
            processedResults[productId].push(response as string);
        }
    });

    return products.map((product) => ({
        ...product,
        images: processedResults[product.productId] || [],
    }));
};

const removeFinalS = (word: string) => {
    return word.endsWith('s') ? word.slice(0, -1) : word;
};

export const getProductsPlaceholders = ({
    products,
    definition,
}: {
    products: ProductItem[];
    definition: keyof Omit<Products, 'any'>;
}) =>
    products.map((prod) => {
        if ('chroma' in prod) {
            return {
                ...prod,
                images: prod.chroma![definition]?.images?.map((imgName: string, imgIndex: number) =>
                    imgName.includes('chroma')
                        ? `https://vitruveo-projects.s3.amazonaws.com/Xibit/assets/${prod.productId}/placeholder_${removeFinalS(prod.categoryId)}-${imgIndex + 1}.png`
                        : `https://vitruveo-projects.s3.amazonaws.com/Xibit/assets/${prod.productId}/${imgName.replace(/^~\//, '')}`
                ),
            };
        }
        return {
            ...prod,
            images: prod.images.map((imgName, imgIndex) =>
                imgName.includes('chroma')
                    ? `https://vitruveo-projects.s3.amazonaws.com/Xibit/assets/${prod.productId}/placeholder_${removeFinalS(prod.categoryId)}-${imgIndex + 1}.png`
                    : `https://vitruveo-projects.s3.amazonaws.com/Xibit/assets/${prod.productId}/${imgName.replace(/^~\//, '')}`
            ),
        };
    });
