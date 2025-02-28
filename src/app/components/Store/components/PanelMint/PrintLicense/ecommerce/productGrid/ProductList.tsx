import React, { useEffect } from 'react';
import { filter, orderBy } from 'lodash';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconButton } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { ShowAnimation } from '@/animations';
import Link from 'next/link';
import { useSelector, useDispatch } from '@/store/hooks';

import ProductSearch from './ProductSearch';
import { IconBasket, IconMenu2 } from '@tabler/icons-react';
import AlertCart from '../productCart/AlertCart';
import emptyCart from 'public/images/products/empty-shopping-cart.svg';

import Image from 'next/image';
import { ProductType } from '../types';

import { addToCart, fetchProducts, filterReset, setSelectedProduct } from '@/features/ecommerce/slice';
import { PanelMintProps } from '../../../component';
import BlankCard from '@/app/components/Shared/BlankCard';
import Cart from '../productCart/Cart';

interface Props extends PanelMintProps {
    onClick: (event: React.SyntheticEvent | Event) => void;
}

const ProductList = ({ onClick, actions, data }: Props) => {
    const dispatch = useDispatch();
    const { handleCloseModalPrintLicense } = actions;
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('sm'));

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchProducts(dispatch);
    }, [dispatch]);

    const getVisibleProduct = (products: ProductType[], sortBy: string, filters: any, search: string) => {
        // SORT BY
        if (sortBy === 'newest') {
            products = orderBy(products, ['created'], ['desc']);
        }
        if (sortBy === 'priceDesc') {
            products = orderBy(products, ['price'], ['desc']);
        }
        if (sortBy === 'priceAsc') {
            products = orderBy(products, ['price'], ['asc']);
        }
        if (sortBy === 'discount') {
            products = orderBy(products, ['discount'], ['desc']);
        }

        // FILTER PRODUCTS
        if (filters.category !== 'All') {
            //products = filter(products, (_product) => includes(_product.category, filters.category));
            products = products.filter((_product) => _product.category.includes(filters.category));
        }

        //FILTER PRODUCTS BY GENDER
        if (filters.gender !== 'All') {
            products = filter(products, (_product) => _product.gender === filters.gender);
        }

        //FILTER PRODUCTS BY GENDER
        if (filters.color !== 'All') {
            products = products.filter((_product) => _product.colors.includes(filters.color));
        }

        //FILTER PRODUCTS BY Search
        if (search !== '') {
            products = products.filter((_product) =>
                _product.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            );
        }

        //FILTER PRODUCTS BY Price
        if (filters.price !== 'All') {
            const minMax = filters.price ? filters.price.split('-') : '';
            products = products.filter((_product) =>
                filters.price ? _product.price >= minMax[0] && _product.price <= minMax[1] : true
            );
        }

        return products;
    };

    const getProducts = useSelector((state) =>
        getVisibleProduct(
            state.ecommerce.products,
            state.ecommerce.sortBy,
            state.ecommerce.filters,
            state.ecommerce.productSearch
        )
    );

    // for alert when added something to cart
    const [cartalert, setCartalert] = React.useState(false);

    const handleClick = () => {
        setCartalert(true);
    };

    const handleClose = (reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setCartalert(false);
    };

    const handleSelectedProduct = (productId: string) => {
        dispatch(setSelectedProduct(productId));
    };

    // skeleton
    const [isLoading, setLoading] = React.useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box>
            {/* ------------------------------------------- */}
            {/* Header Detail page */}
            {/* ------------------------------------------- */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" pb={3}>
                {lgUp ? (
                    <Typography variant="h5">Products</Typography>
                ) : (
                    <Fab onClick={onClick} color="primary" size="small">
                        <IconMenu2 width="16" />
                    </Fab>
                )}

                <Box display="flex">
                    <Cart />
                    <IconButton
                        size="small"
                        aria-label="close"
                        onClick={handleCloseModalPrintLicense}
                        sx={{ color: 'text' }}
                    >
                        <IconX size={'1.7rem'} />
                    </IconButton>
                </Box>
            </Stack>

            {/* ------------------------------------------- */}
            {/* Page Listing product */}
            {/* ------------------------------------------- */}
            <Grid
                container
                rowGap={2.85}
                columnGap={3}
                overflow="auto"
                paddingBottom={15}
                maxHeight="100vh"
                display={'flex'}
                justifyContent={'center'}
            >
                <Box
                    style={{
                        width: 'auto',
                        minWidth: smUp ? '80%' : 'unset',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: 30,
                        paddingTop: '0',
                        paddingBottom: 40,
                    }}
                >
                    {getProducts.length > 0 ? (
                        <>
                            {getProducts.map((product) => (
                                <Grid
                                    item
                                    xl={3}
                                    lg={2}
                                    md={4}
                                    sm={6}
                                    xs={12}
                                    sx={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    key={product.id}
                                >
                                    <ShowAnimation>
                                        {/* ------------------------------------------- */}
                                        {/* Product Card */}
                                        {/* ------------------------------------------- */}
                                        {isLoading ? (
                                            <>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={270}
                                                    height={300}
                                                    sx={{
                                                        borderRadius: (theme) => theme.shape.borderRadius / 5,
                                                    }}
                                                ></Skeleton>
                                            </>
                                        ) : (
                                            <BlankCard className="hoverCard">
                                                <Typography
                                                    onClick={() => handleSelectedProduct(product.id.toString())}
                                                >
                                                    <Image
                                                        src={product.photo}
                                                        alt="img"
                                                        width={250}
                                                        height={200}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            borderRadius: 'inherit',
                                                        }}
                                                    />
                                                </Typography>

                                                <Tooltip title="Add To Cart">
                                                    <Fab
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => dispatch(addToCart(product)) && handleClick()}
                                                        sx={{
                                                            bottom: '98px',
                                                            right: '15px',
                                                            position: 'absolute',
                                                        }}
                                                    >
                                                        <IconBasket size="16" />
                                                    </Fab>
                                                </Tooltip>
                                                <CardContent sx={{ width: 250, p: 3, pt: 2 }}>
                                                    <Typography variant="h6" minHeight={40}>
                                                        {product.title}
                                                    </Typography>
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="space-between"
                                                        mt={1}
                                                    >
                                                        <Stack direction="row" alignItems="center">
                                                            <Typography variant="h6">${product.price}</Typography>
                                                            <Typography
                                                                color="textSecondary"
                                                                ml={1}
                                                                sx={{ textDecoration: 'line-through' }}
                                                            >
                                                                ${product.salesPrice}
                                                            </Typography>
                                                        </Stack>
                                                        <Rating
                                                            name="read-only"
                                                            size="small"
                                                            value={product.rating}
                                                            readOnly
                                                        />
                                                    </Stack>
                                                </CardContent>
                                            </BlankCard>
                                        )}
                                        <AlertCart handleClose={handleClose} openCartAlert={cartalert} />
                                        {/* ------------------------------------------- */}
                                        {/* Product Card */}
                                        {/* ------------------------------------------- */}
                                    </ShowAnimation>
                                </Grid>
                            ))}
                        </>
                    ) : (
                        <>
                            <Grid item xs={12} lg={12} md={12} sm={12}>
                                <Box textAlign="center" mt={6}>
                                    <Image src={emptyCart} alt="cart" width={200} />
                                    <Typography variant="h2">There is no Product</Typography>
                                    <Typography variant="h6" mb={3}>
                                        The Product you are searching is no longer available.
                                    </Typography>
                                    <Button variant="contained" onClick={() => dispatch(filterReset())}>
                                        Try Again
                                    </Button>
                                </Box>
                            </Grid>
                        </>
                    )}
                </Box>
            </Grid>
        </Box>
    );
};

export default ProductList;
