import React from 'react'
import Component from './client'
import { MobileBottomNavbar } from '../../components/bottomNav'
import Makedark from './makedark'

const products = [
    {
        id: 1,
        title: "Banarasi Silk Saree",
        description: "A luxurious Banarasi silk saree with intricate golden zari work, perfect for weddings and special occasions.",
        images: [
            "/divyanshi-verma-Pf7FSLjkHZU-unsplash.jpg",
            "/srinivas-jd-hj50WxMqPVg-unsplash.jpg",
            "/bulbul-ahmed-A7H3qmJTNJc-unsplash.jpg",

        ],
        price: "129.99",
    },
    {
        id: 2,
        title: "Kanchipuram Silk Saree",
        description: "Traditional Kanchipuram silk saree featuring rich colors and fine craftsmanship, ideal for festive wear.",
        images: [
            "/anway-pawar-IqdXalnpt2o-unsplash.jpg",
            "/divyanshi-verma-Pf7FSLjkHZU-unsplash.jpg",
            "/bulbul-ahmed-A7H3qmJTNJc-unsplash.jpg",
        ],
        price: "149.99",
    },
    {
        id: 3,
        title: "Chiffon Saree",
        description: "Lightweight and elegant chiffon saree with a subtle sheen, suitable for casual and semi-formal events.",
        images: [
            "/srinivas-jd-hj50WxMqPVg-unsplash.jpg",
            "/bulbul-ahmed-A7H3qmJTNJc-unsplash.jpg",
        ],
        price: "79.99",
    },
    {
        id: 4,
        title: "Georgette Saree",
        description: "Stylish georgette saree with beautiful embroidery, perfect for evening parties and gatherings.",
        images: [
            "/bulbul-ahmed-A7H3qmJTNJc-unsplash.jpg",
            "/srinivas-jd-hj50WxMqPVg-unsplash.jpg",
        ],
        price: "89.99",
    },
];

const Demopage = () => {
    return (
        <div className=''>
            <Makedark />
            <MobileBottomNavbar link={"/demo"} isProducts={true} biz={null} />
            <Component products={products} bannerImg='' phone='8971860300' name='Shagun Saree Center' title='Exquisite sarees for the modern woman' desc='Explore our collection of handpicked sarees, crafted to make you feel confident and beautiful' address={"Kumbararwada cross, bidar"} timings="9:00 Am - 10:00pm" fb={""} insta='' />
            <div className='h-screen'>
            </div>
        </div>
    )
}

export default Demopage