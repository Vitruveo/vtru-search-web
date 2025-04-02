import { api } from '@/services/api';
import { Products } from './types';

export const getProductsImages = async ({
    products,
    assetId,
    onlyFirst,
}: {
    products: Products[];
    assetId: string;
    onlyFirst?: boolean;
}): Promise<Products[]> => {
    console.log('Iniciando processamento de imagens');

    const requests = products.flatMap((product) => {
        const imagesToProcess = onlyFirst ? product.images.slice(0, 1) : product.images;
        return imagesToProcess.map((imgName) => ({
            productId: product.productId,
            imgName,
            requestData: {
                source: `https://vitruveo-projects.s3.amazonaws.com/Xibit/assets/${product.productId}/${imgName.replace(/^~\//, '')}`,
            },
        }));
    });

    const fetchImage = async (request: { productId: string; imgName: string; requestData: { source: string } }) => {
        try {
            console.log(`Processando: ${request.imgName}`);
            const response = await api.get(
                `assets/public/printOutputGenerator/${assetId}?source=${encodeURIComponent(request.requestData.source)}`,
                {
                    responseType: 'blob',
                }
            );

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const imageUrl = URL.createObjectURL(blob);

            return {
                productId: request.productId,
                imgName: request.imgName,
                response: imageUrl,
                success: true,
            };
        } catch (error) {
            return {
                productId: request.productId,
                imgName: request.imgName,
                response: error,
                success: false,
            };
        }
    };

    const results = await Promise.allSettled(requests.map(fetchImage));

    const processedResults = results.map((result, index) =>
        result.status === 'fulfilled'
            ? result.value
            : {
                  productId: requests[index].productId,
                  imgName: requests[index].imgName,
                  response: result.reason,
                  success: false,
              }
    );

    console.log(
        `Total de resultados: ${processedResults.length} (${processedResults.filter((r) => r.success).length} sucesso / ${processedResults.filter((r) => !r.success).length} falha)`
    );

    return products.map((product) => ({
        ...product,
        images: processedResults
            .filter((result) => result.productId === product.productId && result.success)
            .map((result) => result.response),
    }));
};
