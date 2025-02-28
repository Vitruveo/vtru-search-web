import { sub } from 'date-fns';
import { Chance } from 'chance';
import mock from '@/features/common/mock';

const chance = new Chance();

const ProductsData = [
    {
        title: 'White 11oz Ceramic Mug',
        price: 5,
        discount: 2,
        related: false,
        salesPrice: 7,
        category: ['books'],
        gender: 'Men',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#1890FF'],
        photo: '/images/products/whiteCeramicMug.webp',
        id: 1,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }).toString(),
        description: chance.paragraph({ sentences: 2 }),
    },
    {
        title: 'Retro Trucker Cap',
        price: 13,
        discount: 2,
        related: false,
        salesPrice: 13,
        category: ['books'],
        gender: 'Men',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#1890FF'],
        photo: '/images/products/whiteHat.webp',
        id: 1,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }).toString(),
        description: chance.paragraph({ sentences: 2 }),
    },
    {
        title: 'Unisex Reclaimist Crewneck T-Shirt',
        price: 4,
        discount: 2,
        related: false,
        salesPrice: 18,
        category: ['books'],
        gender: 'Men',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#1890FF'],
        photo: '/images/products/white-mist.webp',
        id: 1,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }).toString(),
        description: chance.paragraph({ sentences: 2 }),
    },
];

// mock.onGet('/api/mock').reply(() => {
//     return [200, ProductsData];
// });

export default ProductsData;
