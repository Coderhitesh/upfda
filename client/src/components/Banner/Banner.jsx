"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
    };

    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('https://www.api.upfda.in/api/v1/get_banners');
                const reverseData = response.data.data.reverse();
                const activeData = reverseData.filter(item => item.isActive === true);
                setBanner(activeData);
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };

        fetchBanner();
    }, []);
    return (

        <section className="w-full">
            <div className="slider-container">
                <Slider {...settings}>
                    {
                        banner && banner.slice(0, 1).map((item, index) => (
                            <div key={index} className="relative hero_banner_height w-full">
                                <img src={item?.image?.url} className='w-full h-full object-cover' alt="" />
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </section>
    )
}

export default Banner
