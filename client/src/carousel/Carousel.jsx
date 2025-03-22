import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false ,
        appendDots: dots => (
            <div className="slick-dots-container">
                <ul className="custom-dots"> {dots} </ul>
            </div>
        ),
    };

    return (
        <div className="w-full">
        <Slider {...settings}>
            {/* Slide 1 */}
            <div className="w-full !flex flex-col md:!flex-row items-center justify-between gap-10 px-6 sm:px-10 md:px-20 lg:px-28 py-12 sm:py-16 md:py-20">
                {/* Text Section */}
                <div className="w-full md:w-1/2 space-y-6 sm:space-y-8 text-center md:text-left max-w-lg">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Ideas That Go Beyond The Borders</h1>
                    <p className="text-sm sm:text-base text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et nostrum maiores totam dolorem atque minus provident voluptatem, nemo porro cumque.
                    </p>
                </div>
    
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src="./images/carousel2.png" alt="image1" className="w-3/4 sm:w-2/3 md:w-1/2 rounded-lg shadow-lg" />
                </div>
            </div>
    
            {/* Slide 2 */}
            <div className="w-full !flex flex-col md:!flex-row items-center justify-between gap-10 px-6 sm:px-10 md:px-20 lg:px-28 py-12 sm:py-16 md:py-20">
                {/* Text Section */}
                <div className="w-full md:w-1/2 space-y-6 sm:space-y-8 text-center md:text-left max-w-lg">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Fast, Reliable, and Efficient.</h1>
                    <p className="text-sm sm:text-base text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et nostrum maiores totam dolorem atque minus provident voluptatem, nemo porro cumque.
                    </p>
                </div>
    
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src="./images/carousel1.png" alt="image1" className="w-3/4 sm:w-2/3 md:w-1/2 rounded-lg shadow-lg" />
                </div>
            </div>
        </Slider>
    
        {/* Custom Styling for Dots */}
        <style jsx>{`
    .slick-dots-container {
        display: flex;
        justify-content: center;
        margin-top: 16px;
        position: relative;
        bottom: -20px; /* Adjust position */
    }
    .custom-dots li {
        display: inline-block;
        margin: 0 5px;
    }
    .custom-dots li button:before {
        font-size: 10px;
        color: gray;
        opacity: 0.6;
    }
    .custom-dots li.slick-active button:before {
        color: black;
        opacity: 1;
    }
`}</style>

    </div>
    
    );
}

export default Carousel;
