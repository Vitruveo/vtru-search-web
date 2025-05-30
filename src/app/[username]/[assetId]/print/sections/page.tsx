import { Catalog, Products } from './types';
import { API_BASE_URL, CATALOG_BASE_URL } from '@/constants/api';
import { PrintSectionComponent } from './Component';

interface PrintSectionsProps {
    params: {
        username: string;
        assetId: string;
    };
}

const definitions: Record<string, keyof Products> = {
    portrait: 'vertical',
    landscape: 'horizontal',
    square: 'square',
};

export default async function PrintSections({ params }: PrintSectionsProps) {
    const catalogRequest = await fetch(CATALOG_BASE_URL);
    const catalog: Catalog = await catalogRequest.json();

    const assetRaw = await fetch(`${API_BASE_URL}/assets/store/${params.assetId}`);
    const asset = await assetRaw.json();
    const definition = definitions[asset?.data?.formats?.original?.definition] || 'vertical';

    const sections = catalog.sections;
    const products = catalog.products[definition] || [];

    const productsBySection = sections.reduce((acc: Record<string, any>, section) => {
        acc[section.sectionId] = section.categories.reduce((catAcc: Record<string, any>, category) => {
            catAcc[category] = {
                count: products.reduce((prodAcc, prod) => {
                    if (prod.categoryId === category) prodAcc++;
                    else prodAcc = 0;
                    return prodAcc;
                }, 0),
            };
            catAcc['countAll'] = Object.values(catAcc).reduce((sum, value) => sum + (value.count || 0), 0);
            return catAcc;
        }, {});
        return acc;
    }, {});

    return (
        <PrintSectionComponent
            data={{
                assetId: params.assetId,
                assetTitle: asset.data.assetMetadata.context.title,
                assetPreviewPath: asset.data.formats.preview.path,
                username: params.username,
                sections: sections,
                productsBySection: productsBySection,
            }}
        />
    );
}
