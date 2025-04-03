import { sub } from 'date-fns';

const ProductsData = [
    {
        title: 'Wall Art',
        price: 32.58,
        discount: 2,
        related: false,
        salesPrice: 42.58,
        category: ['books'],
        gender: 'Men',
        rating: 5,
        stock: true,
        qty: 1,
        colors: ['#1890FF'],
        photo: '/images/products/wallArt/scene04.webp',
        id: 1,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }).toString(),
        description:
            'Add a touch of elegance to your space with this stunning artwork. Printed on high-quality canvas, this piece brings creativity and sophistication to any room. Perfect for art lovers, collectors, or as a unique gift!',
        images: [],
    },
    {
        title: 'White 11oz Ceramic Mug',
        price: 24.1,
        discount: 2,
        related: false,
        salesPrice: 34.1,
        category: ['books'],
        gender: 'Men',
        rating: 4,
        stock: true,
        qty: 1,
        colors: ['#1890FF'],
        photo: '/images/products/whiteCeramicMug/right.webp',
        id: 2,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }).toString(),
        description:
            'Enjoy your favorite drink in style with this unique mug featuring exclusive artwork. Perfect for art lovers and collectors, this high-quality ceramic mug adds a creative touch to your daily routine. Ideal as a gift or a special addition to your collection!',
        images: [],
    },
    {
        title: 'The Resilient Rose Classic Unisex',
        price: 21.9,
        discount: 2,
        related: false,
        salesPrice: 31.9,
        category: ['books'],
        gender: 'Men',
        rating: 4,
        stock: true,
        qty: 1,
        colors: ['#1890FF'],
        photo: '/images/products/white-mist/scene01.webp',
        id: 4,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }).toString(),
        description: `This t-shirt is renowned for its soft feel, ideal for DTG printing.

Offers a seamless double-needle collar with high stitch density for a smoother printing surface.
Includes a tear-away label for easy rebranding.
Tubular fit to minimize torque.
Available in a wide range of colors to suit various design needs.`,
        images: [],
    },
    {
        title: 'The Resilient Rose Premium Tote Bag',
        price: 37.3,
        discount: 2,
        related: false,
        salesPrice: 47.3,
        category: ['books'],
        gender: 'Men',
        rating: 5,
        stock: true,
        qty: 1,
        colors: ['#1890FF'],
        photo: '/images/products/bag/scene05.webp',
        id: 5,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }).toString(),
        description: `Cover all your grab and go needs with these long handle premium tote bags while being eco-conscious. These premium tote bags feature reinforced stitching on handles for more stability. Your unique designs will stand out on these 100% cotton fabric tote bags. Any whites in your design will be treated as transparent in the printing process for the natural color tote bags. Please keep this in mind to ensure optimal results
    - Reinforced stitching on handles
    - Large printable area for front & back
    - Capacity 10 litres`,
        images: [],
    },
];

export default ProductsData;
