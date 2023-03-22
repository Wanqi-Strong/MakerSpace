import './ImageSlider.css';
import React, { useState } from 'react';
import { ImagesData } from './ImagesData'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <div className='container flex flex_ver sliderBox'>
            <div className='slider'>
                <FaAngleDoubleLeft className='left-arrow' onClick={prevSlide} />
                <FaAngleDoubleRight className='right-arrow' onClick={nextSlide} />
                {ImagesData.map((slide, index) => {
                    return (
                        <>
                            <div
                                className={index === current ? 'slide active' : 'slide'}
                                key={index}
                            >
                                {index === current && (
                                    <img src={slide.image} alt='MakerSpace' className='image' />
                                )}
                            </div>
                            <div class='text-on-image'>
                                <h1 style={{color: 'white', margin:'40px'}}>WELCOME TO MAKERSPACE</h1>
                                <p style={{color: 'white', margin:'60px', padding: '20px'}}>PCs, equipment, workshops, and more!</p>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageSlider;