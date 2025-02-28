import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from '@/store/hooks';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

//Carousel slider for product
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//Carousel slider data
import SliderData from './SliderData';
import './Carousel.css';

//fetch product

import Image from 'next/image';
import { fetchProducts } from '@/features/ecommerce/slice';
import { ProductType } from '../types';
import { Theme, useMediaQuery } from '@mui/material';

const ProductCarousel = () => {
    const [state, setState] = React.useState<any>({ nav1: null, nav2: null });
    const slider1 = useRef();
    const slider2 = useRef();
    const dispatch = useDispatch();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('sm'));

    // Get Product
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // dispatch(fetchProducts());
    }, [dispatch, pathName, searchParams]);

    // Get Products
    const product = useSelector((rxState) =>
        rxState.ecommerce.products.find((v) => v.id.toString() === rxState.ecommerce.selectedProduct)
    );

    const getProductImage = product ? product.photo : '';

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current,
        });
    }, []);

    const sliderData =
        product?.images?.map((item, index) => ({
            id: index + 1,
            imgPath: item,
        })) || [];

    const { nav1, nav2 } = state;
    const settings = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: smUp ? 4 : 2,
        arrows: false,
        swipeToSlide: true,
        slidesToScroll: 1,
        centerMode: true,
        className: 'centerThumb',
        speed: 500,
    };

    const imgStyle: React.CSSProperties = smUp
        ? { borderRadius: '5px', maxWidth: '100%', objectFit: 'contain' }
        : {
              borderRadius: '5px',
              width: '100%',
              objectFit: 'cover',
          };

    const slider1ContainerStyle = smUp
        ? {
              width: '100%',
              height: 600,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }
        : { width: '100%', height: 300 };

    const slider2ContainerStyle = smUp
        ? {
              p: 1,
              cursor: 'pointer',
              width: 100,
              height: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }
        : { p: 1, cursor: 'pointer' };

    return (
        <Box sx={smUp ? { width: 600, margin: '0 auto' } : { width: '100%', margin: '0 auto' }}>
            <Slider asNavFor={nav2} ref={(slider: any) => (slider1.current = slider)}>
                {sliderData.map((step) => (
                    <Box key={step.id} sx={slider1ContainerStyle}>
                        <Image
                            src={step.imgPath}
                            alt={step.imgPath}
                            width={smUp ? 600 : 300}
                            height={smUp ? 600 : 300}
                            style={imgStyle}
                        />
                    </Box>
                ))}
            </Slider>
            <Box sx={smUp ? { width: 600, marginTop: 2 } : {}}>
                <Slider asNavFor={nav1} ref={(slider: any) => (slider2.current = slider)} {...settings}>
                    {sliderData.map((step) => (
                        <Box key={step.id} sx={slider2ContainerStyle}>
                            <Image
                                src={step.imgPath}
                                alt={step.imgPath}
                                width={smUp ? 92 : 72}
                                height={smUp ? 92 : 72}
                                style={imgStyle}
                            />
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
};

export default ProductCarousel;
